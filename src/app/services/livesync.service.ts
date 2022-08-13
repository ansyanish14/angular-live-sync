import { Injectable } from '@angular/core';
import { AudioService } from "../services/audio.service";
import { StreamState } from "../interfaces/stream-state";
import { ClientService } from '../services/client.service';
import { PlayListSong } from '../interfaces/play-list-song';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LivesyncService {

  state!: StreamState;
  playlistSongs: Array<PlayListSong> = [];
  currentFile: any = {};

  constructor(public audioService: AudioService,
    private client: ClientService) {
  }

  createAudioService(){
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  loadPlaylistSongs(playlistId: any){
    this.client.getPlaylistSongs(playlistId).subscribe(data => {
      this.playlistSongs = data;
      this.openSongFile(0);
    });    
  }

  openSongFile(index: any) {
    console.log(index);
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
    this.audioService.playStream(url).subscribe();
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

  onSliderChange(change: any) {
    this.audioService.seekTo(change.value);
  }
}
