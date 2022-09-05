import { Component, OnInit } from '@angular/core';
import { IgxFilterOptions } from 'igniteui-angular';
import { Router } from '@angular/router';
import { CognitoService, IUser } from '../../services/cognito.service';
import { ClientService } from '../../services/client.service';
import { PlayList } from '../../interfaces/play-list';
import { LivesyncList } from '../../interfaces/livesync-list';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../pages/confirm/confirm.component';

@Component({
  selector: 'app-livesync-playlist',
  templateUrl: './livesync-playlist.component.html',
  styleUrls: ['./livesync-playlist.component.scss']
})
export class LivesyncPlaylistComponent implements OnInit {

  public searchContact!: string;
  user: IUser;

  //play: Playlist[] = playlists;
  livesync: Array<LivesyncList> = [];

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
      if(!success){
        this.router.navigate(['/signIn']);
      }       
    });

    this.cognitoService.getUser().then((user: any) => {
      this.user = user;
      this.client.getLiveSyncByUser(user.username).subscribe(data => {
        this.livesync = data;
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

  public joinLiveSync(playlistId: number, livesyncId: number){
    this.client.checkActiveLivesync(livesyncId).subscribe(data => {
      if(data){
        this.router.navigate(['/livesync', livesyncId]);
      } else {
        this.openDialog();
      }
    });
  }

  public savePlaylist() {
    console.log(this.user);
    console.log(this.playlist.playlistName);
  }

  openDialog(): void {
    var message = "Host not started livesync";
    this.dialog.open(ConfirmComponent, {
      width: '350px',
      data: {message: message, syncId: 0, isJoin : false}
    });
  }

  deleteLivesync(livesyncId: number) {
    this.client.deleteLivesyncById(livesyncId).subscribe(data => {
      if(data == "Deleted"){
        this.router.navigate(['/playlist']);
      }
    });
  }

  addUsers(livesyncId: any, name: any){
    this.router.navigate(['/syncuser', livesyncId], { queryParams: { name: name } });
  }
}
