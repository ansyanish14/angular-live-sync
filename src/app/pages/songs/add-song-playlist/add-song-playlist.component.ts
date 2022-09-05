import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder } from '@angular/forms';
import { PlayList } from '../../../interfaces/play-list';

@Component({
  selector: 'app-add-song-playlist',
  templateUrl: './add-song-playlist.component.html',
  styleUrls: ['./add-song-playlist.component.scss']
})
export class AddSongPlaylistComponent {

  constructor(private dialogRef: MatDialogRef<AddSongPlaylistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PlayList[]) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
