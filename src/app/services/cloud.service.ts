import { Injectable } from '@angular/core';
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  files: any = [
    // tslint:disable-next-line: max-line-length
    {
      url:
        "https://d3obkodgkevryu.cloudfront.net/Taylor-Swift-You-Belong-With-Me.mp3",
      name: "Perfect",
      artist: " Ed Sheeran"
    },
    {
      // tslint:disable-next-line: max-line-length
      url:"https://d3obkodgkevryu.cloudfront.net/nightlife-michael-kobrin.mp3",
      name: "Man Atkeya Beparwah",
      artist: "Nusrat Fateh Ali Khan"
    },
    {
      url:"https://d3obkodgkevryu.cloudfront.net/Fifth-Harmony-Work-from-Home.mp3",
      name: "Penny Lane",
      artist: "The Beatles"
    }
  ];

  getFiles() {
    return of(this.files);
  }
}
