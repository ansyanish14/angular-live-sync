import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { 
	IgxAvatarModule,
	IgxFilterModule,
	IgxIconModule,
	IgxListModule,
	IgxInputGroupModule,
	IgxButtonGroupModule,
	IgxRippleModule
 } from "igniteui-angular";

import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PlayerComponent } from './pages/player/player.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { SyncuserComponent } from './pages/syncuser/syncuser.component';
import { LivesyncComponent } from './pages/livesync/livesync.component';
import { SongsComponent } from './pages/songs/songs.component';
import { LivesyncPlaylistComponent } from './pages/livesync-playlist/livesync-playlist.component';
import { AddPlaylistComponent } from './pages/playlist/add-playlist/add-playlist.component';
import { AddSongPlaylistComponent } from './pages/songs/add-song-playlist/add-song-playlist.component';
import { ViewSongsComponent } from './pages/playlist/view-songs/view-songs.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { ConfirmComponent } from './pages/confirm/confirm.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';


const modules = [
  AppRoutingModule,
  BrowserModule,
	BrowserAnimationsModule,
	FormsModule,
  ReactiveFormsModule,
	IgxAvatarModule,
  IgxFilterModule,
	IgxIconModule,
	IgxListModule,
	IgxInputGroupModule,
	IgxButtonGroupModule,
	IgxRippleModule,
  MatButtonModule,
  MatGridListModule,
  MatDividerModule,
  MatCardModule,
  MatToolbarModule,
  FlexLayoutModule,
  MatBottomSheetModule,
  MatIconModule,
  MatSliderModule,
  MatListModule,
  MatMenuModule,
  MatTabsModule,
  HttpClientModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatSidenavModule,
  MatDialogModule,
  MatInputModule,
  MatBadgeModule
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    PlayerComponent,
    PlaylistComponent,
    SyncuserComponent,
    LivesyncComponent,
    SongsComponent,
    LivesyncPlaylistComponent,
    AddPlaylistComponent,
    AddSongPlaylistComponent,
    ViewSongsComponent,
    NotificationComponent,
    ConfirmComponent,
    ForgotPasswordComponent,
  ],
  imports: modules,
  exports: modules,
  providers: [
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {
    
}