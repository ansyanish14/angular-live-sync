import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CognitoService, IUser } from './services/cognito.service';
import { NotificationService } from './services/notification.service';
import { ClientService } from "./services/client.service";

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isAuthenticated: boolean;
  matCount: any;
  user: any = 0;

  constructor(private router: Router,
              public cognitoService: CognitoService,
              private observer: BreakpointObserver,
              public notification: NotificationService,
              private client: ClientService) {
    this.isAuthenticated = false;
    this.user = {} as any;    
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  public ngOnInit(): void {
    this.cognitoService.isAuthenticated().then((success: boolean) => {
      this.isAuthenticated = success;
      if(success){
        this.cognitoService.getUser().then((data: any) => {
          this.user = data.attributes;
          this.notification.connectWebSocket(data.username);
          this.client.getNotificationCount(data.username).subscribe(data => {
            this.notification.incrementMatCount(data);
          });
        });
      }
    });
  }

  public signOut(): void {
    this.cognitoService.signOut()
    .then(() => {
      localStorage.clear();
      this.notification.disconnectWebSocket();
      this.router.navigate(['/signIn'])
      .then(() => {
        window.location.reload();
      });
    });
  }
}