import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NotificationVo } from '../models/notification-vo';
import { ConfirmComponent } from '../pages/confirm/confirm.component';
import { Notification } from '../interfaces/notification';
import { ClientService } from '../services/client.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  webSocket!: WebSocket;
  matCount: any = 0;
  notification: Notification;
  notifications: Array<Notification> = [];

  private socketConnectUrl = "wss://k501yge2vc.execute-api.eu-west-2.amazonaws.com/production?userName=";

  constructor(private router: Router,
    private dialog: MatDialog,
    private client: ClientService,) {
      this.notification = {} as Notification;
     }

  public connectWebSocket(userName: any){
    this.webSocket = new WebSocket(this.socketConnectUrl + userName);

    this.webSocket.onopen;

    this.webSocket.onmessage = (event) => {
      const responseMes = JSON.parse(event.data);

      if(responseMes['action'] == 'join'){
        this.notification = responseMes;
        this.notification.receiver = userName;
        this.notification.isViewed = false;
        this.notifications.push(this.notification);
        this.openDialog(responseMes['sender'], responseMes['livesyncId']);
      }
    };

    this.webSocket.onclose = (event) => {
    };
  }

  public sendMessage(notoficationVo: NotificationVo){
    this.webSocket.send(JSON.stringify(notoficationVo));
  }

  public disconnectWebSocket() {
    this.webSocket.close();
  }

  openDialog(sender: any, livesyncId: any): void {
    var message = sender + "requested to join livesync";
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
      data: {message: message, livesyncId: livesyncId, isJoin : true}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined) {
        this.router.navigate(['/livesync', result]);
      } else {
        this.client.createNotification(this.notifications).subscribe(data => {
          if(data == "Created") {
            this.incrementMatCount(1);
          }
        });
      }
    });
  }

  incrementMatCount(count: number) {
    this.matCount = this.matCount + count;
  }

  decrementMatCount(count: number) {
    this.matCount = this.matCount - count;
  }
}