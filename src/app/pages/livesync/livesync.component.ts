import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../../services/web-socket.service';
import { CognitoService, IUser } from '../../services/cognito.service';
import { LivesyncReqVo } from '../../models/livesync-req-vo';
import { NotificationVo } from '../../models/notification-vo';
import { LivesyncList } from '../../interfaces/livesync-list';
import { LivesyncService } from '../../services/livesync.service';
import { ClientService } from '../../services/client.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-livesync',
  templateUrl: './livesync.component.html',
  styleUrls: ['./livesync.component.scss']
})
export class LivesyncComponent implements OnInit {

  livesyncId: any = 0;
  livesyncData: LivesyncList;
  user: IUser;

  constructor(private activatedroute: ActivatedRoute,    
    private socket: WebSocketService,
    private notification: NotificationService,
    private cognitoService: CognitoService,
    private client: ClientService,
    public livesync: LivesyncService) {
      this.livesync.createAudioService();
      this.user = {} as IUser;
      this.livesyncData = {} as LivesyncList;
  }

  ngOnInit(): void {
    this.livesyncId = this.activatedroute.snapshot.paramMap.get('livesyncId');
    this.livesync.createAudioService();
    this.cognitoService.getUser().then((user: any) => {
      this.user = user;
      this.client.getLivesyncByIdAndUser(user.username, this.livesyncId).subscribe(data => {
        this.livesyncData = data[0];
        this.livesync.loadPlaylistSongs(this.livesyncData, this.user);
        this.sendNotification(user, this.livesyncId);
        this.socket.connectWebSocket(this.livesyncData, this.user);
      });
    });    
    this.livesync.customObservable.subscribe((data) => {
      this.callBackFunction(data);
    });
  }

  sendNotification(user: any, livesyncId: any) {
    if(this.user.username == this.livesyncData.hostUser) {
      this.notification.sendMessage(this.buildNotificationVo(user.attributes, livesyncId));
    }
  }

  buildNotificationVo(user: any, livesyncId: any){
    return new NotificationVo(livesyncId, user.family_name +" "+ user.given_name, 
      'Request to join livesync', this.livesyncData.playlistName, 'join');
  }

  callBackFunction(res: any) {
    this.next();
  }

  openFile(index: any) {
    if(this.user.username == this.livesyncData.hostUser) {
      this.livesync.openSongFile(index);
      this.socket.sendMessage(new LivesyncReqVo(this.livesyncId, "select", index, 0));
    }
  }

  pause() {    
    if(this.user.username == this.livesyncData.hostUser) {
      this.livesync.pause();
      this.socket.sendMessage(new LivesyncReqVo(this.livesyncId, "pause", 0, 0));
    }
  }

  play() {
    if(this.user.username == this.livesyncData.hostUser) {
      this.livesync.play();
      this.socket.sendMessage(new LivesyncReqVo(this.livesyncId, "play", 0, 0));
    }
  }

  next() {
    if(this.user.username == this.livesyncData.hostUser) {
      this.livesync.next();
      this.socket.sendMessage(new LivesyncReqVo(this.livesyncId, "next", 0, 0));
    }
  }

  previous() {
    if(this.user.username == this.livesyncData.hostUser) {
      this.livesync.previous();
      this.socket.sendMessage(new LivesyncReqVo(this.livesyncId, "previous", 0, 0));
    }
  }

  isFirstPlaying() {
    return this.livesync.isFirstPlaying();
  }

  isLastPlaying() {
    return this.livesync.isLastPlaying();
  }

  onSliderChange(change: any) {
    if(this.user.username == this.livesyncData.hostUser) {
      this.livesync.onSliderChange(change.value);
      this.socket.sendMessage(new LivesyncReqVo(this.livesyncId, "seekTo", 0, change.value));
    }
  }

  onSliderVoloum(change: any) {
    console.log("volum ----> " + change);
    //this.audioService.volumeTo(change);
  }

  onMute(){
    console.log("mute ----> ");
  }

  closeConnection(){
    if(this.user.username == this.livesyncData.hostUser) {
      this.socket.sendMessage(new LivesyncReqVo(this.livesyncId, "close", 0, 0));
      this.socket.disconnectWebSocket();
    } else {
      this.socket.disconnectWebSocket();
    }
  }
}