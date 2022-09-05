import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from "../../services/client.service";
import { CognitoService, IUser } from '../../services/cognito.service';
import { ListUser } from '../../interfaces/list-user';
import { Notification } from '../../interfaces/notification';

@Component({
  selector: 'app-syncuser',
  templateUrl: './syncuser.component.html',
  styleUrls: ['./syncuser.component.scss']
})
export class SyncuserComponent implements OnInit {

  userList: Array<ListUser> = [];
  userListToSave: Array<ListUser> = [];
  livesyncId: any = 0;
  playlistname: any;
  user: IUser;
  attribute: IUser;
  existingUsers: Array<string> = [];
  notification: Notification;
  notifications: Array<Notification> = [];

  constructor(private activatedroute: ActivatedRoute,
    private cognitoService: CognitoService,
    private router: Router,
    private client: ClientService) {
      this.user = {} as IUser;
      this.attribute = {} as IUser;
      this.notification = {} as Notification;
  }

  ngOnInit(): void {
    this.livesyncId = this.activatedroute.snapshot.paramMap.get('livesyncId');
    this.playlistname = this.activatedroute.snapshot.queryParamMap.get('name');
    
    this.cognitoService.isAuthenticated().then((success: boolean) => {
      if(!success){
        this.router.navigate(['/signIn']);
      }
    });

    this.cognitoService.getUser().then((user: any) => {
      this.user = user;
      this.attribute = user.attributes;
      this.client.getListOfSyncUser(this.livesyncId).subscribe(data => {        
        this.existingUsers = data;
      });
      this.client.getListUsers(user.username).subscribe(data => {
        data.forEach((element: any) => {
          if(this.existingUsers.indexOf(element.userName) !== -1){
            element.isChecked = true;
            this.userListToSave.push(element);
          } else {
            element.isChecked = false;
          }          
          this.userList.push(element);
        });
      });
    });
  }

  onChangeRole(user: ListUser, isChecked: any){
    if(isChecked.checked) {
      this.userListToSave.push(user);
      this.notifications.push(this.buildNotification(user));
    } else {
      const index: number = this.userListToSave.indexOf(user);
      const notIndex: number = this.notifications.indexOf(this.buildNotification(user));
      if (index !== -1) {
        this.userListToSave.splice(index, 1);
      }
      if (notIndex !== -1) {
        this.notifications.splice(notIndex, 1);
      }
    }
  }

  saveSyncUsers(){
    var host = {} as ListUser;
    host.userName = this.user.username;
    this.userListToSave.push(host);

    this.client.saveSyncUsers(this.userListToSave, this.livesyncId).subscribe(data => {
      this.router.navigate(['/livesyncList']);
    });
    this.client.createNotification(this.notifications).subscribe(data => {
      console.log(data);
    });
  }

  buildNotification(user: ListUser) {
    var notification = {} as Notification;
    notification.sender = this.attribute.given_name +" "+ this.attribute.family_name;
    notification.receiver = user.userName;
    notification.subject = 'Added to livesync';
    notification.message = this.playlistname;
    notification.livesyncId = this.livesyncId;
    notification.isViewed = false;
    return notification;
  }
}
