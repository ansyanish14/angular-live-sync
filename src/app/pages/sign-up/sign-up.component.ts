import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IUser, CognitoService } from '../../services/cognito.service';
import { CustomValidators } from '../../classes/custom-validators';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {

  loading: boolean;
  isConfirm: boolean;
  isError: boolean;
  error: any;
  user: IUser;
  public formSignup: FormGroup;
  public formConfirm: FormGroup;

  constructor(private router: Router,
              private cognitoService: CognitoService,
              private formBuilder: FormBuilder) {
    this.loading = false;
    this.isConfirm = false;
    this.isError = false;
    this.user = {} as IUser;
    this.formSignup = this.createSignupForm();
    this.formConfirm = this.createConfirmForm();
  }

  createSignupForm(): FormGroup {
    return this.formBuilder.group(
      {
        firstName: [
          null,
          Validators.compose([Validators.required])
        ],
        lastName: [
          null
        ],
        email: [
          null,
          Validators.compose([Validators.email, Validators.required])
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

  createConfirmForm(): FormGroup {
    return this.formBuilder.group(
      {
        code: [
          null,
          Validators.compose([Validators.required])
        ]
      }
    );
  }

  public signUp(): void {
    this.user = this.formSignup.value;
    this.loading = true;
    this.cognitoService.signUp(this.user)
    .then(() => {
      this.loading = false;
      this.isConfirm = true;
    }).catch((err) => {
      this.loading = false;
      this.isError = true;
      this.error = err.message;
    });
  }

  public confirmSignUp(): void {
    this.loading = true;
    this.user.code = this.formConfirm.value.code;
    this.cognitoService.confirmSignUp(this.user)
    .then(() => {
      this.router.navigate(['/signIn']);
    }).catch((err) => {
      this.loading = false;
      this.isError = true;
      this.error = err.message;
    });
  }

}