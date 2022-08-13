import { Component, OnInit } from '@angular/core';
import { AudioService } from "../services/audio.service";
import { StreamState } from "../interfaces/stream-state";
import { ClientService, ISong} from '../services/client.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  files: Array<ISong> = [];
  state!: StreamState;
  currentFile: any = {};

  public ngOnInit() { 
    this.client.getSongsFromRepo().subscribe(data => {
      this.files = data;
      this.openFile(data[0], 0);
    });
  }

  constructor(
    public audioService: AudioService,
    private client: ClientService
  ) {   

    // listen to stream state
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }  

  openFile(file: any, index: any) {
    this.currentFile = { index, file };
    this.audioService.stops();
    this.playStream(file.url);
  }

  playStream(url: any) {
    this.audioService.playStream(url).subscribe(events => {
      // listening for fun here
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
