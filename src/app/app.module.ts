import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from '@angular/forms';
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
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SonglistComponent } from './songlist/songlist.component';
import { PlayerComponent } from './player/player.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { SyncuserComponent } from './syncuser/syncuser.component';
import { LivesyncComponent } from './livesync/livesync.component';


const modules = [
  AppRoutingModule,
  BrowserModule,
	BrowserAnimationsModule,
	FormsModule,
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


 

 


  
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    SonglistComponent,
    PlayerComponent,
    PlaylistComponent,
    SyncuserComponent,
    LivesyncComponent,
    
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