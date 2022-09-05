import { Component, OnInit } from '@angular/core';
import { IgxFilterOptions } from 'igniteui-angular';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CognitoService, IUser } from '../../services/cognito.service';
import { ClientService } from '../../services/client.service';
import { PlayList } from '../../interfaces/play-list';
import { AddPlaylistComponent } from './add-playlist/add-playlist.component';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  public searchContact!: string;
  user: IUser;

  //play: Playlist[] = playlists;
  playlists: Array<PlayList> = [];

  public density = 'playList';
  public displayDensities: any;
  isAuthenticated: boolean;
  playlist: PlayList;

  constructor(private router: Router,
    private cognitoService: CognitoService,
    private client: ClientService,
    private dialog: MatDialog) {
      this.user = {} as IUser;
      this.isAuthenticated = false;
      this.playlist = {} as PlayList;
  }

  public ngOnInit() {
    this.cognitoService.isAuthenticated().then((success: boolean) => {
      this.isAuthenticated = success;
      if(success){
        console.log();
      } else {
        this.router.navigate(['/signIn']);
      }
    });

    this.cognitoService.getUser().then((user: any) => {
      this.user = user;
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
    fo.key = 'name';
    fo.inputValue = this.searchContact;
    return fo;
  }

  public saveLivesync(playlistId: number){
    this.playlist.playlistId = playlistId;
    this.playlist.userName = this.user.username;
    this.client.createLivesync(this.playlist).subscribe(data => {
      this.router.navigate(['/livesyncList']);
    });
    
  }

  public playSong(playlistId: number){
    this.router.navigate(['/player'], { queryParams: { playlistId: playlistId } });
  }
  
  public viewAllSongs(playlistId: number){
    this.router.navigate(['/viewSong'], { queryParams: { playlistId: playlistId } });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlaylistComponent, {
      width: '350px',
      data: {name: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.playlist.playlistName = result;
      this.playlist.userName = this.user.username;
      this.playlist.isFavorite = false;
      this.client.createPlaylist(this.playlist).subscribe(data => {
        window.location.reload();
      });
    });
  }

  deletePlaylist(playlistId: number) {
    this.client.deletePlaylistById(playlistId).subscribe(data => {
      if(data == "Deleted"){
        this.router.navigate(['/songs']);
      }
    });
  }
}