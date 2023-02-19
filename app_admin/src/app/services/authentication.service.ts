import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from 'src/app/storage';
import { Users } from 'src/app/models/users';
import { AuthResponse } from 'src/app/models/authresponse';
import { TripDataService } from './trip-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) { }

  public getToken(): string { 
    return this.storage.getItem('travlr-token');
  }

  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  public login(user: Users): Promise<any>{
    return this.tripDataService.login(user)
      .then((authResp: AuthResponse) =>
    this.saveToken(authResp.token));
  }

  public register(user: Users): Promise<any> {
    return this.tripDataService.register(user)
      .then((authResp: AuthResponse) =>
    this.saveToken(authResp.token));
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload= JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }
  
  public getCurrentUser(): Users {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      const {email, name} =
    JSON.parse(atob(token.split('.')[1]));
      return {email, name} as Users;
    }
}

}
