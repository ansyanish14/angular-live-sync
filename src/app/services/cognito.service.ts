import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Amplify, { Auth } from 'aws-amplify';

import { environment } from '../../environments/environment';
import { ListUser } from '../interfaces/list-user';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  code: string;
  name: string;
  given_name: string;
  family_name: string
  username:string;
}

@Injectable({
  providedIn: 'root',
})
export class CognitoService {

  isAutheticate: boolean;
  
  private authenticationSubject: BehaviorSubject<any>;
  
  constructor() {
    Amplify.configure({
      Auth: environment.cognito,
    });
    this.isAutheticate = false;
    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: IUser): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
      attributes: {
        given_name: user.firstName,
        family_name: user.lastName
      }
    });
  }

  public confirmSignUp(user: IUser): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }

  public forgotPassword(user: IUser): Promise<any> {
    return Auth.forgotPassword(user.email);
  }

  public confirmForgotPassword(user: IUser): Promise<any> {
    return Auth.forgotPasswordSubmit(user.email, user.code, user.password);
  }

  public signIn(user: IUser): Promise<any> {
    return Auth.signIn(user.email, user.password).then(() => {
      this.authenticationSubject.next(true);
    });
  }

  public signOut(): Promise<any> {
    return Auth.signOut().then(() => {
      this.authenticationSubject.next(false);
    });
  }

  public isAuthenticated(): Promise<boolean> {
    if (this.authenticationSubject.value) {
      return Promise.resolve(true);
    } else {
      return this.getUser().then((user: any) => {
        if (user) {
          this.isAutheticate = true;
          return true;
        } else {
          this.isAutheticate = false;
          return false;
        }
      }).catch(() => {
        this.isAutheticate = false;
        return false;
      });
    }
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public updateUser(user: IUser): Promise<any> {
    return Auth.currentUserPoolUser().then((cognitoUser: any) => {
      return Auth.updateUserAttributes(cognitoUser, user);
    });
  }
}