import { Injectable } from '@angular/core';
import { of } from "rxjs";
import songRepo from "../../assets/music_repo.json";

interface Song {
  id: String;
  isFavorite: boolean;
  songName: String;  
  artistName: String;
  length: String;
  genre: String;
  photo: String;
  url: String;
}

@Injectable({
  providedIn: 'root'
})
export class CloudService {


  files: Song[] = songRepo;

  getFiles() {
    return of(this.files);
  }
}
