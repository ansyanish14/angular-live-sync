import { Component, OnInit } from '@angular/core';
import songlist from './musicRepo.json';
import { IgxFilterOptions } from 'igniteui-angular';

interface Song {
  isFavorite: boolean;
  songName: String;  
  artistName: String;  
  genre: String;
  photo: String;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {

  public searchContact!: string;

  songs: Song[] = songlist;

  public density = 'song';
  public displayDensities: any;

  constructor() { }

  public ngOnInit() {
    this.displayDensities = [
        { label: 'Songs', selected: this.density === 'song', togglable: true },
        { label: 'Play List', selected: this.density === 'playList', togglable: true }
    ];
  }

  public selectDensity(event: any) {
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
  
}
