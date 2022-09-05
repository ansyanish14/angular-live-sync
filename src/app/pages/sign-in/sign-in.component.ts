import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUser, CognitoService } from '../../services/cognito.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {

  loading: boolean;
  isError: boolean;
  error: any;
  user: IUser;
  public formSignin: FormGroup;

  constructor(private router: Router,
              private cognitoService: CognitoService,
              private formBuilder: FormBuilder,
              private notification: NotificationService) {
    this.loading = false;
    this.isError = false;
    this.user = {} as IUser;
    this.formSignin = this.createSigninForm();
  }

  createSigninForm(): FormGroup {
    return this.formBuilder.group(
      {
        email: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ],
        password: [
          null,
          Validators.compose([Validators.required])
        ]
      }
    );
  }

  public signIn(): void {
    this.loading = true;
    this.user = this.formSignin.value;
    this.cognitoService.signIn(this.user)
    .then(() => {
      this.router.navigate(['/dashboard']).then(() => {
        window.location.reload();
      });
    }).catch((err) => {
      this.loading = false;
      this.isError = true;
      this.error = err.message;
    });

  }

}