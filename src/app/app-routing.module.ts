import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './pages/profile/profile.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PlayerComponent } from './pages/player/player.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { SyncuserComponent } from './pages/syncuser/syncuser.component';
import { LivesyncComponent } from './pages/livesync/livesync.component';
import { SongsComponent } from './pages/songs/songs.component';
import { ViewSongsComponent } from './pages/playlist/view-songs/view-songs.component';
import { LivesyncPlaylistComponent } from './pages/livesync-playlist/livesync-playlist.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { NotificationComponent } from './pages/notification/notification.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signIn',
    pathMatch: 'full',
  },
  {
    path: 'songs',
    component: SongsComponent,
  },
  {
    path: 'forgot',
    component: ForgotPasswordComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  { path:'syncuser/:livesyncId',
    component: SyncuserComponent,
  },
  { path:'livesync/:livesyncId',
    component: LivesyncComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'signIn',
    component: SignInComponent,
  },
  {
    path: 'signUp',
    component: SignUpComponent,
  },
  {
    path:'player',
    component: PlayerComponent,
  },
  {
    path:'playlist',
    component: PlaylistComponent,
  },
  {
    path: 'livesyncList',
    component: LivesyncPlaylistComponent,
  },
  {
    path: 'viewSong',
    component: ViewSongsComponent,
  },
  {
    path: 'notification',
    component: NotificationComponent,
  },
  {
    path: '**',
    redirectTo: 'signIn',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}