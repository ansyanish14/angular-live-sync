import { Component, OnInit } from '@angular/core';
import { IgxFilterOptions } from 'igniteui-angular';
import { Router } from '@angular/router';
import { ClientService } from "../services/client.service";
import { Song } from '../interfaces/song';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {

  public searchContact!: string;

  //songs: any;
  songs: Array<Song> = [];

  public density = 'song';
  public displayDensities: any;

  constructor(
    private router: Router,
    private client: ClientService
  ) {}

  public ngOnInit() {
    this.displayDensities = [
        { label: 'Songs', selected: this.density === 'song', togglable: true },
        { label: 'Play List', selected: this.density === 'playList', togglable: true }
    ];

    this.client.getSongsFromRepo().subscribe(data => {
      this.songs = data;
    });
  }

  public selectDensity(event: any) {
    if(event.index == 0) {
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

  public redirectPlayer(){
    this.router.navigateByUrl("player");
  }

  public redirectPlaylist(){
    this.router.navigateByUrl("playlist");
  }
}
