import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export interface ISong {
  id: String;
  isFavorite: boolean;
  songName: String;  
  artistName: String;  
  genre: String;
  length: String;  
  photo: String;
  url: String;
}

export interface IPlaylist {
  playlistId: number;
  playlistName: String;
  userName: String;
  displayName: String;
  isFavorite: boolean;
}

export interface IListUser {
  userName: string;
  email: String;
  firstName: String;
  lastName: String;
  isActive: boolean;
  userStatus: String;
  isChecked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private getSongsUrl = "https://92fepi8y41.execute-api.eu-west-2.amazonaws.com/development/songs";
  private getPlaylistUrl = "https://6bgl3k869k.execute-api.eu-west-2.amazonaws.com/v1/playlist?";
  private getUserListUrl = "https://jgkac4tbnj.execute-api.eu-west-2.amazonaws.com/v1/getListUsers";
  private saveSyncUsersUrl = "https://htfwgcjby3.execute-api.eu-west-2.amazonaws.com/v1/syncUsers/7";

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getSongsFromRepo(): Observable<any> {
    return this.httpClient.get<ISong[]>(this.getSongsUrl).pipe(catchError(this.handleError));
  }

  getPlaylistByUser(userid : string): Observable<any> {
    console.log("userid--->"+userid);
    var url = this.getPlaylistUrl + userid;
    console.log("userid--->"+url);
    return this.httpClient.get<IPlaylist[]>("https://6bgl3k869k.execute-api.eu-west-2.amazonaws.com/v1/playlist/7").pipe(catchError(this.handleError));
  }

  getListUsers(): Observable<any> {
    return this.httpClient.get<ISong[]>(this.getUserListUrl)
      .pipe(catchError(this.handleError));
  }

  saveSyncUsers(userListToSave: Array<IListUser>, playlistId: any): Observable<any> {
    console.log(userListToSave);
    console.log(playlistId);
    const headers = { 'content-type': 'application/json', 
      'Access-Control-Allow-Origin': '*' };
    const body=JSON.stringify(userListToSave);

    return this.httpClient.post(this.saveSyncUsersUrl, body)
      .pipe(catchError(this.handleError));
  }

}
