import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService, IListUser } from "../services/client.service";

@Component({
  selector: 'app-syncuser',
  templateUrl: './syncuser.component.html',
  styleUrls: ['./syncuser.component.scss']
})
export class SyncuserComponent implements OnInit {

  userList: Array<IListUser> = [];
  userListToSave: Array<IListUser> = [];
  playlistId: any = 0;

  constructor(private router: Router,
    private activatedroute: ActivatedRoute,
    private client: ClientService) {    
  }  

  ngOnInit(): void {
    this.playlistId = this.activatedroute.snapshot.paramMap.get('playlistId');
    console.log(this.playlistId);

    this.client.getListUsers().subscribe(data => {
      data.forEach((element: any) => {
        element.isChecked = false;
        this.userList.push(element);
      });
    });
  }

  onChangeRole(user: IListUser, isChecked: any){
    console.log(user);
    console.log(isChecked.checked);

    if(isChecked.checked) {
      this.userListToSave.push(user);
    } else {
      console.log('inside else block');
      const index: number = this.userListToSave.indexOf(user);
      if (index !== -1) {
        this.userListToSave.splice(index, 1);
      }
    }
  }

  saveSyncUsers(){
    console.log(this.playlistId);
    const index: number = this.userListToSave.length;
    console.log(this.userListToSave);

    this.client.saveSyncUsers(this.userListToSave,this.playlistId).subscribe(data => {
      console.log(data);
    });
  }

}
