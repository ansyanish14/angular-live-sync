import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AudioService } from "../../services/audio.service";
import { StreamState } from "../../interfaces/stream-state";
import { ClientService } from '../../services/client.service';
import { Song } from '../../interfaces/song';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  playlistId: any = 0;
  files: Array<Song> = [];
  state!: StreamState;
  currentFile: any = {};
  event: any = {};

  constructor(
    public audioService: AudioService,
    private client: ClientService,
    private activatedroute: ActivatedRoute
  ) {
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  public ngOnInit() {
    this.playlistId = this.activatedroute.snapshot.queryParamMap.get('playlistId');
    this.client.getPlaylistSongs(this.playlistId).subscribe(data => {      
      this.files = data;
      this.openFile(data[0], 0);
    });
  }

  openFile(file: any, index: any) {
    this.currentFile = { index, file };
    this.audioService.stops();
    this.playStream(file.url);
  }

  playStream(url: any) {
    this.audioService.playStream(url).subscribe(events => {
      this.event = events;
      if(this.event.type == 'ended' && !this.isLastPlaying()){
        this.next();
      }
    });
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }

  stops() {
    this.audioService.stops();
  }

  ended(){
    console.log('inside ended '+this.state.isEnded);
    this.next();
  }

  next() {
    const index = this.currentFile.index + 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }

  onSliderChangeEnd(change: any) {
    this.audioService.seekTo(change.value);
  }

  onSliderVoloum(change: any) {
    console.log("volum ----> " + change);
    //this.audioService.volumeTo(change);
  }

}
