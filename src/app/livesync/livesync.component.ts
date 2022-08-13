import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../services/web-socket.service';
import { LivesyncReqVo } from '../models/livesync-req-vo';

import { LivesyncService } from '../services/livesync.service';

@Component({
  selector: 'app-livesync',
  templateUrl: './livesync.component.html',
  styleUrls: ['./livesync.component.scss']
})
export class LivesyncComponent implements OnInit {

  playlistId: any = 0;

  constructor(private activatedroute: ActivatedRoute,    
    private socket: WebSocketService,
    public livesync: LivesyncService) {
      this.livesync.createAudioService();
  }

  ngOnInit(): void {
    this.playlistId = this.activatedroute.snapshot.paramMap.get('playlistId');
    this.livesync.createAudioService();
    this.livesync.loadPlaylistSongs(this.playlistId);
    this.socket.connectWebSocket(this.playlistId);
  }

  openFile(index: any) {
    this.livesync.openSongFile(index);
    this.socket.sendMessage(new LivesyncReqVo(this.playlistId, "select", index));
  }

  pause() {
    this.livesync.pause();
    this.socket.sendMessage(new LivesyncReqVo(this.playlistId, "pause", 0));
  }

  play() {
    this.livesync.play();
    this.socket.sendMessage(new LivesyncReqVo(this.playlistId, "play", 0));
  }

  next() {
    this.livesync.next();
    this.socket.sendMessage(new LivesyncReqVo(this.playlistId, "next", 0));
  }

  previous() {
    this.livesync.previous();
    this.socket.sendMessage(new LivesyncReqVo(this.playlistId, "previous", 0));
  }

  isFirstPlaying() {
    return this.livesync.isFirstPlaying();
  }

  isLastPlaying() {
    return this.livesync.isLastPlaying();
  }

  onSliderChange(change: any) {
    this.livesync.onSliderChange(change);
  }

  onSliderVoloum(change: any) {
    console.log("volum ----> " + change);
    //this.audioService.volumeTo(change);
  }

}
