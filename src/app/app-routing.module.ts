import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SonglistComponent } from './songlist/songlist.component';
import { MatSliderModule } from '@angular/material/slider';
import { PlayerComponent } from './player/player.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { SyncuserComponent } from './syncuser/syncuser.component';
import { LivesyncComponent } from './livesync/livesync.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  { path:'syncuser/:playlistId',
    component: SyncuserComponent,
  },
  { path:'livesync/:playlistId',
    component: LivesyncComponent,
  },
  {
    path:'songlist',
    component: SonglistComponent,
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
    path: 'dashboard',
    component: DashboardComponent,
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