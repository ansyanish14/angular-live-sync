import { Injectable } from '@angular/core';
import { LivesyncReqVo } from '../models/livesync-req-vo';
import { Router } from '@angular/router';
import { AudioService } from "../services/audio.service";
import { StreamState } from "../interfaces/stream-state";
import { LivesyncService } from '../services/livesync.service';
import { LivesyncList } from '../interfaces/livesync-list';
import { IUser } from '../services/cognito.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socketConnectUrl = "wss://3q0gocmh51.execute-api.eu-west-2.amazonaws.com/production?liveSyncId=";

  webSocket!: WebSocket;
  state!: StreamState;


  constructor(public audioService: AudioService,
    private router: Router,
    private livesyncService: LivesyncService) {
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  public connectWebSocket(livesync: LivesyncList, user: IUser){

    this.webSocket = new WebSocket(this.socketConnectUrl + livesync.livesyncId);

    this.webSocket.onopen = (event) => {
      if(user.username != livesync.hostUser) {
        this.sendMessage(new LivesyncReqVo(livesync.livesyncId, "request", 0, 0));
      }
    };

    this.webSocket.onmessage = (event) => {
      const responseMes = JSON.parse(event.data);

      if(responseMes['action'] == 'request') {
        if(user.username == livesync.hostUser) {
          this.sendMessage(this.livesyncService.getCurrentStatus(livesync.livesyncId));
        }
      }
      if(responseMes['action'] == 'response') {
        if(user.username != livesync.hostUser) {
          const index = responseMes['index'];
          const value = responseMes['value'];
          this.livesyncService.openSongFile(index);
          this.livesyncService.onSliderChange(value);
        }        
      }
      if(responseMes['action'] == 'pause') {
        this.livesyncService.pause();
      }
      if(responseMes['action'] == 'play') {
        this.livesyncService.play();
      }
      if(responseMes['action'] == 'next') {
        this.livesyncService.next();
      }
      if(responseMes['action'] == 'previous') {
        this.livesyncService.previous();
      }
      if(responseMes['action'] == 'select') {
        const index = responseMes['index'];
        this.livesyncService.openSongFile(index);
      }
      if(responseMes['action'] == 'seekTo') {
        const value = responseMes['value'];
        this.livesyncService.onSliderChange(value);
      }
      if(responseMes['action'] == 'close') {
        this.disconnectWebSocket();
      }
    };

    this.webSocket.onclose = (event) => {
      if(event.type == "close") {
        this.livesyncService.pause();
        this.router.navigate(['/livesyncList']);
      }
    };
  }

  public sendMessage(livesyncVo: LivesyncReqVo){
    this.webSocket.send(JSON.stringify(livesyncVo));
  }

  public disconnectWebSocket() {
    this.webSocket.close();
  }
}
