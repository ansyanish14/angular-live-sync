import { Injectable } from '@angular/core';
import { AudioService } from "../services/audio.service";
import { StreamState } from "../interfaces/stream-state";
import { ClientService } from '../services/client.service';
import { PlayListSong } from '../interfaces/play-list-song';
import { LivesyncReqVo } from '../models/livesync-req-vo';
import { LivesyncList } from '../interfaces/livesync-list';
import { IUser } from '../services/cognito.service';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LivesyncService {

  state!: StreamState;
  playlistSongs: Array<PlayListSong> = [];
  currentFile: any = {};
  event: any = {};
  livesyncId: any = "";

  private customSubject = new Subject<any>();
  customObservable = this.customSubject.asObservable();

  constructor(public audioService: AudioService,
    private client: ClientService) {
  }

  createAudioService(){
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  loadPlaylistSongs(livesync: LivesyncList, user: IUser){
    this.livesyncId = livesync.livesyncId;
    this.client.getPlaylistSongs(livesync.playlistId).subscribe(data => {
      this.playlistSongs = data;
      if(user.username == livesync.hostUser) {
        this.openSongFile(0);
      }      
    });    
  }

  openSongFile(index: any) {
    const selectFile = this.playlistSongs[index];
    this.currentFile = { index, selectFile };
    this.audioService.stops();
    this.playStream(selectFile.url);
  }

  loadSongs(playlistId: any): Observable<PlayListSong[]>{
    return this.client.getPlaylistSongs(playlistId);
  }

  openFileFromPlayer(file: any){
    this.audioService.stops();
    this.playStream(file.url);
  }

  playStream(url: any) {
    this.audioService.playStream(url).subscribe(events => {
      this.event = events;
      if(this.event.type == 'ended' && !this.isLastPlaying()){
        this.customSubject.next('ended');
      }
    });
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }

  next() {
    const index = this.currentFile.index + 1;
    this.openSongFile(index);
  }

  previous() {
    const index = this.currentFile.index - 1;
    this.openSongFile(index);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.playlistSongs.length - 1;
  }

  getCurrentStatus(livesyncId: any){
    var index = this.currentFile.index;
    var value = this.audioService.getCurrentSeekTime();
    var seconds = value.split(':');
    var duration = (+seconds[0]) * 60 * 60 + (+seconds[1]) * 60 + (+seconds[2]);
    return new LivesyncReqVo(livesyncId, "response", index, duration);
  }

  onSliderChange(value: any) {
    this.audioService.seekTo(value);
  }
}