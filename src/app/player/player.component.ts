import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, PartialObserver, Observer } from 'rxjs';
import { AudioService } from "../services/audio.service";
import { CloudService } from "../services/cloud.service";
import { StreamState } from "../interfaces/stream-state";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

  files: Array<any> = [];
  state!: StreamState;
  currentFile: any = {};

  constructor(
    public audioService: AudioService,
    public cloudService: CloudService
  ) {
    // get media files
    cloudService.getFiles().subscribe(files => {
      this.files = files;
    });

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

}
