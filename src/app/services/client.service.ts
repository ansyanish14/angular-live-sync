import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Song } from '../interfaces/song';
import { PlayList } from '../interfaces/play-list';
import { ListUser } from '../interfaces/list-user';
import { PlayListSong } from '../interfaces/play-list-song';
import { LivesyncList } from '../interfaces/livesync-list';
import { Notification } from '../interfaces/notification';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private getSongsUrl = "https://92fepi8y41.execute-api.eu-west-2.amazonaws.com/v1/songs";
  private getPlaylistByUserUrl = "https://6bgl3k869k.execute-api.eu-west-2.amazonaws.com/v1/playlist?userName=";
  private getUserListUrl = "https://jgkac4tbnj.execute-api.eu-west-2.amazonaws.com/v1/getListUsers";
  private syncUsersUrl = "https://htfwgcjby3.execute-api.eu-west-2.amazonaws.com/v1/syncUsers/";
  private playlistSongURL = "https://6bgl3k869k.execute-api.eu-west-2.amazonaws.com/v1/playlist/:playlistId/songs";
  private playlistUrl = "https://6bgl3k869k.execute-api.eu-west-2.amazonaws.com/v1/playlist";
  private livesyncUrl = "https://e8mo80d2wk.execute-api.eu-west-2.amazonaws.com/v1/livesync";
  private notificationUrl = "https://u6l7w2vh1m.execute-api.eu-west-2.amazonaws.com/v1/notification";
  private connectionUrl = "https://g6drjd4fzg.execute-api.eu-west-2.amazonaws.com/v1/connection?livesyncId=";

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getSongsByAlbum(album: any): Observable<any> {
    return this.httpClient.get<Song[]>(this.getSongsUrl + "?album="+album).pipe(catchError(this.handleError));
  }

  getSongsByCategory(category: any): Observable<any> {
    return this.httpClient.get<Song[]>(this.getSongsUrl + "?category="+category).pipe(catchError(this.handleError));
  }

  getSongsFromRepo(): Observable<any> {
    return this.httpClient.get<Song[]>(this.getSongsUrl).pipe(catchError(this.handleError));
  }

  getPlaylistByUser(userName : string): Observable<any> {
    var url = this.getPlaylistByUserUrl + userName;
    return this.httpClient.get<PlayList[]>(url).pipe(catchError(this.handleError));
  }

  getPlaylistById(playlistId : string): Observable<any> {
    var url = this.playlistUrl + "/"+playlistId;
    return this.httpClient.get<PlayList[]>(url).pipe(catchError(this.handleError));
  }

  createPlaylist(playlists: PlayList): Observable<any> {
    const body=JSON.stringify(playlists);
    return this.httpClient.post(this.playlistUrl, body)
      .pipe(catchError(this.handleError));
  }

  addSongToPlaylist(song: PlayListSong, playlistId: any): Observable<any> {
    const body=JSON.stringify(song);
    return this.httpClient.post(this.playlistSongURL.replace(":playlistId", playlistId), body)
      .pipe(catchError(this.handleError));
  }

  getPlaylistSongs(playlistId: any): Observable<any> {
    return this.httpClient.get<Song[]>(this.playlistSongURL.replace(":playlistId", playlistId))
      .pipe(catchError(this.handleError));
  }

  getListUsers(userName : string): Observable<any> {
    var url = this.getUserListUrl + "?userName="+ userName;
    return this.httpClient.get<ListUser[]>(url).pipe(catchError(this.handleError));
  }

  saveSyncUsers(userListToSave: Array<ListUser>, livesyncId: any): Observable<any> {
    const body=JSON.stringify(userListToSave);
    var url = this.syncUsersUrl + livesyncId;
    return this.httpClient.post(url, body).pipe(catchError(this.handleError));
  }

  getLiveSyncByUser(userName : string): Observable<any> {
    var url = this.livesyncUrl + "?userName="+ userName;
    return this.httpClient.get<LivesyncList[]>(url).pipe(catchError(this.handleError));
  }

  createLivesync(playlist : PlayList): Observable<any> {
    const body=JSON.stringify(playlist);
    return this.httpClient.post(this.livesyncUrl, body).pipe(catchError(this.handleError));
  }

  getLivesyncByIdAndUser(userName : string, livesyncId: any): Observable<any> {
    var url = this.livesyncUrl + "/" + livesyncId +"/user/" + userName;
    return this.httpClient.get<LivesyncList>(url).pipe(catchError(this.handleError));
  }

  getListOfSyncUser(livesyncId: any): Observable<any> {
    var url = this.syncUsersUrl + livesyncId;
    return this.httpClient.get<string[]>(url).pipe(catchError(this.handleError));
  }

  getNotificationCount(userName : string): Observable<any> {
    var url = this.notificationUrl +"/"+ userName +"/count";
    return this.httpClient.get<any>(url).pipe(catchError(this.handleError));
  }

  getNotification(userName : string): Observable<any> {
    var url = this.notificationUrl +"/"+ userName;
    return this.httpClient.get<Notification[]>(url).pipe(catchError(this.handleError));
  }

  updateNotification(notification : Notification): Observable<any> {
    const body=JSON.stringify(notification);
    return this.httpClient.patch(this.notificationUrl, body).pipe(catchError(this.handleError));
  }

  createNotification(notification : Notification[]): Observable<any> {
    const body=JSON.stringify(notification);
    return this.httpClient.post(this.notificationUrl, body).pipe(catchError(this.handleError));
  }

  checkActiveLivesync(livesyncId: any): Observable<any> {
    var url = this.connectionUrl + livesyncId;
    return this.httpClient.get<boolean>(url).pipe(catchError(this.handleError));
  }

  deleteLivesyncById(livesyncId: any): Observable<any> {
    var url = this.livesyncUrl + "/" + livesyncId;
    return this.httpClient.delete<any>(url).pipe(catchError(this.handleError));
  }

  deletePlaylistById(playlistId: any): Observable<any> {
    var url = this.playlistUrl + "/" + playlistId;
    console.log(url);
    return this.httpClient.delete<any>(url).pipe(catchError(this.handleError));
  }
}
