import { Component, OnInit } from '@angular/core';
import { IgxFilterOptions } from 'igniteui-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from "../../services/client.service";
import { MatDialog } from '@angular/material/dialog';
import { Song } from '../../interfaces/song';
import { AddSongPlaylistComponent } from './add-song-playlist/add-song-playlist.component';

import { PlayListSong } from '../../interfaces/play-list-song';
import { PlayList } from '../../interfaces/play-list';

import { CognitoService, IUser } from '../../services/cognito.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {

  songs: Array<Song> = [];
  category: any;
  album: any;
  playlistSong: PlayListSong;
  playlists: Array<PlayList> = [];
  searchContact: any;

  constructor(private router: Router,
    private activatedroute: ActivatedRoute,
    private cognitoService: CognitoService,
    private client: ClientService,
    private dialog: MatDialog) {
      this.category = null;
      this.album = null;
      this.playlistSong = {} as PlayListSong;
  }

  ngOnInit(): void {
    this.category = this.activatedroute.snapshot.queryParamMap.get('category');
    this.album = this.activatedroute.snapshot.queryParamMap.get('album');
    if(this.category != null){
      this.client.getSongsByCategory(this.category).subscribe(data => {
        this.songs = data;
      });
    } else if(this.album != null) {
      this.client.getSongsByAlbum(this.album).subscribe(data => {
        this.songs = data;
      });
    } else {
      this.client.getSongsFromRepo().subscribe(data => {
        this.songs = data;
      });
    }

    this.cognitoService.isAuthenticated().then((success: boolean) => {
      if(!success){
        this.router.navigate(['/signIn']);
      }
    });

    this.cognitoService.getUser().then((user: any) => {
      this.client.getPlaylistByUser(user.username).subscribe(data => {
        this.playlists = data;
      });
    });
  }

  public toggleFavorite(contact: any) {
    contact.isFavorite = !contact.isFavorite;
  }

  get filterContacts() {
    const fo = new IgxFilterOptions();
    fo.key = 'songName';
    fo.inputValue = this.searchContact;
    return fo;
  }

  public redirectPlayer(){
    this.router.navigateByUrl("player");
  }

  public savePlaylist(){
    this.router.navigateByUrl("playlist");
  }

  openDialog(songId: any): void {
    const dialogRef = this.dialog.open(AddSongPlaylistComponent, {
      width: '350px',
      data: this.playlists
    });

    dialogRef.afterClosed().subscribe(result => {
      this.playlistSong.songId = songId;
      this.playlistSong.isFavorite = false;
      this.client.addSongToPlaylist(this.playlistSong, result).subscribe(data => {
        console.log(data);
      });      
    });
  }

}
