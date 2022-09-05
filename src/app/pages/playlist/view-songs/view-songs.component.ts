import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IgxFilterOptions } from 'igniteui-angular';
import { ClientService } from '../../../services/client.service';
import { PlayListSong } from '../../../interfaces/play-list-song';

@Component({
  selector: 'app-view-songs',
  templateUrl: './view-songs.component.html',
  styleUrls: ['./view-songs.component.scss']
})
export class ViewSongsComponent implements OnInit {

  playlistId: any = 0;
  playlistName: any;
  public searchContact!: string;
  playlistSongs: Array<PlayListSong> = [];

  constructor(private activatedroute: ActivatedRoute,
    private client: ClientService) {
  }

  ngOnInit(): void {
    this.playlistId = this.activatedroute.snapshot.queryParamMap.get('playlistId');
    this.client.getPlaylistById(this.playlistId).subscribe(data => {
      this.playlistName = data[0].playlistName;
    });
    this.client.getPlaylistSongs(this.playlistId).subscribe(data => {      
      this.playlistSongs = data;
    });
  }

  public toggleFavorite(contact: any) {
    contact.isFavorite = !contact.isFavorite;
  }

  get filterContacts() {
    const fo = new IgxFilterOptions();
    fo.key = 'name';
    fo.inputValue = this.searchContact;
    return fo;
  }

  public playAll() {
    this.playlistId;
  }

}
