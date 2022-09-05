import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IUser, CognitoService } from '../../services/cognito.service';
import { CustomValidators } from '../../classes/custom-validators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  isConfirm: boolean;
  loading: boolean;
  isError: boolean;
  error: any;
  user: IUser;
  email: any;
  public formEmail: FormGroup;
  public formPassword: FormGroup;

  constructor(private router: Router,
    private cognitoService: CognitoService,
    private formBuilder: FormBuilder) {
      this.loading = false;
    this.isConfirm = false;
    this.isError = false;
    this.user = {} as IUser;
    this.formEmail = this.createEmailForm();
    this.formPassword = this.createPasswordForm();
  }

  createEmailForm(): FormGroup {
    return this.formBuilder.group(
      {
        email: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ]
      }
    );
  }

  createPasswordForm(): FormGroup {
    return this.formBuilder.group(
      {
        code: [
          null,
          Validators.compose([Validators.required])
        ],
        password: [
          null,
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, {
              hasNumber: true
            }),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            // check whether the entered password has a lower case letter
            CustomValidators.patternValidator(/[a-z]/, {
              hasSmallCase: true
            }),
            // check whether the entered password has a special character
            CustomValidators.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true
              }
            ),
            Validators.minLength(8)
          ])
        ],
        confirmPassword: [null, Validators.compose([Validators.required])]
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      }
    );
  }

  public generateForgotPasswordCode(): void {
    this.user = this.formEmail.value;
    this.loading = true;
    this.cognitoService.forgotPassword(this.user)
    .then((data) => {
      this.email = this.user.email;
      this.isError = false;
      this.loading = false;
      this.isConfirm = true;
    }).catch((err) => {
      this.isError = true;
      this.loading = false;
      this.error = err.message;
    }); 
  }

  public confirmForgotPassword(): void {
    this.user = this.formPassword.value;
    this.loading = true;
    this.user.email = this.email;
    this.cognitoService.confirmForgotPassword(this.user)
    .then((data) => {
      this.isError = false;
      this.router.navigate(['/signIn']);
    }).catch((err) => {
      this.loading = false;
      this.isError = true;
      this.error = err.message;
    });
  }

}
