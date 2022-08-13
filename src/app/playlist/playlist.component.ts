import { Component, OnInit } from '@angular/core';
import playlists from './playlist.json';
import { IgxFilterOptions } from 'igniteui-angular';
import { Router } from '@angular/router';
import { CognitoService, IUser } from '../services/cognito.service';
import { ClientService } from '../services/client.service';
import { PlayList } from '../interfaces/play-list';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  public searchContact!: string;
  user: IUser;

  //play: Playlist[] = playlists;
  playlist: Array<PlayList> = [];

  public density = 'playList';
  public displayDensities: any;
  isAuthenticated: boolean;

  constructor(private router: Router, 
    private cognitoService: CognitoService,
    private client: ClientService) {
      this.user = {} as IUser;
      this.isAuthenticated = false;
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
      this.user = user.attributes;
      this.client.getPlaylistByUser(this.user.email).subscribe(data => {
        this.playlist = data;
      });
    });    
    
    this.displayDensities = [
      { label: 'Songs', selected: this.density === 'song', togglable: true },
      { label: 'Play List', selected: this.density === 'playList', togglable: true }
    ];
  }

  public selectDensity(event: any) {
    if(event.index == 0){
      this.router.navigateByUrl("dashboard");
    } else {
      this.router.navigateByUrl("playlist");
    }
    this.density = this.displayDensities[event.index].label;
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

  public redirectPlayer(playlistId: number){
    console.log("playlistId---->"+playlistId);
    //this.router.navigateByUrl("player");
  }
}