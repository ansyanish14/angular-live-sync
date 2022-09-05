import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from "../../services/client.service";
import { CognitoService, IUser } from '../../services/cognito.service';
import { Notification } from '../../interfaces/notification';
import { IgxFilterOptions } from 'igniteui-angular';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  user: IUser;
  notificationList: Array<Notification> = [];

  constructor(private cognitoService: CognitoService,
    private router: Router,
    private client: ClientService,
    private notification: NotificationService) {
      this.user = {} as IUser;
  }

  ngOnInit(): void {
    this.cognitoService.isAuthenticated().then((success: boolean) => {
      if(!success){
        this.router.navigate(['/signIn']);
      }
    });

    this.cognitoService.getUser().then((user: any) => {
      this.user = user;
      this.client.getNotification(user.username).subscribe(data => {
        this.notificationList = data;
      });
    });
  }

  get filterContacts() {
    const fo = new IgxFilterOptions();
    fo.key = 'name';
    return fo;
  }

  viewNotification(notification: Notification) {
    if(!notification.isViewed) {
      this.client.updateNotification(notification).subscribe(data => {
        if(data == "Updated") {
          this.notification.decrementMatCount(1);
        }        
      });
    }
    if(notification.livesyncId != 0){
      this.router.navigate(['/livesyncList']);
    }
  }

}
