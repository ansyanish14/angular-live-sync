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
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent
  ],
  imports: [
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
	  IgxRippleModule
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {
    
}