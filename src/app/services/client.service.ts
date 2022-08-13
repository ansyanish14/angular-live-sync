import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Song } from '../interfaces/song';
import { PlayList } from '../interfaces/play-list';
import { ListUser } from '../interfaces/list-user';
import { PlayListSong } from '../interfaces/play-list-song';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private getSongsUrl = "https://92fepi8y41.execute-api.eu-west-2.amazonaws.com/v1/songs";
  private getPlaylistUrl = "https://6bgl3k869k.execute-api.eu-west-2.amazonaws.com/v1/playlist?userId=";
  private getUserListUrl = "https://jgkac4tbnj.execute-api.eu-west-2.amazonaws.com/v1/getListUsers";
  private saveSyncUsersUrl = "https://htfwgcjby3.execute-api.eu-west-2.amazonaws.com/v1/syncUsers/7";
  private getPlaylistSongsURL = "https://6bgl3k869k.execute-api.eu-west-2.amazonaws.com/v1/playlist/:playlistId/songs";

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
    return this.httpClient.get<Song[]>(this.getSongsUrl).pipe(catchError(this.handleError));
  }

  getPlaylistByUser(userid : string): Observable<any> {
    var url = this.getPlaylistUrl + userid;
    return this.httpClient.get<PlayList[]>("https://6bgl3k869k.execute-api.eu-west-2.amazonaws.com/v1/playlist/7").pipe(catchError(this.handleError));
  }

  getPlaylistSongs(playlistId: any): Observable<any> {
    return this.httpClient.get<PlayListSong[]>(this.getPlaylistSongsURL.replace(":playlistId", "7"))
      .pipe(catchError(this.handleError));
  }

  getListUsers(): Observable<any> {
    return this.httpClient.get<ListUser[]>(this.getUserListUrl)
      .pipe(catchError(this.handleError));
  }

  saveSyncUsers(userListToSave: Array<ListUser>, playlistId: any): Observable<any> {
    const body=JSON.stringify(userListToSave);

    return this.httpClient.post(this.saveSyncUsersUrl, body)
      .pipe(catchError(this.handleError));
  }

}
