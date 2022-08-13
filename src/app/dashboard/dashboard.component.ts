import { Component, OnInit } from '@angular/core';
import songlist from "../../assets/music_repo.json";
import { IgxFilterOptions } from 'igniteui-angular';
import { Router } from '@angular/router';
import { ISong, ClientService } from "../services/client.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {

  public searchContact!: string;

  //songs: any;
  songs: Array<ISong> = [];

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
    console.log(event.index);
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
