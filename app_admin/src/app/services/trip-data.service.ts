import { Inject, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Trip } from '../../../../app_admin/models/trip';
import { Users } from 'src/app/models/users';
import { AuthResponse } from 'src/app/models/authresponse';
import { BROWSER_STORAGE } from 'src/app/storage';

@Injectable()
export class TripDataService {

  constructor(private http: Http,
    @Inject(BROWSER_STORAGE) private storage: Storage) { }

  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;

  public getTrips(): Promise<Trip[]>{
    console.log('Inside TripDataService#getTrips()');
    return this.http 
      .get(this.tripUrl)
      .toPromise()
      .then((response) => response.json() as Trip[])
      .catch(this.handleError);
  }

  public getTrip(code: string): Promise<Trip>{
    console.log('Inside TripDataService#getTrip(tripCode)');
    return this.http 
      .get(this.tripUrl + code)
      .toPromise()
      .then((response) => response.json() as Trip)
      .catch(this.handleError);
  }

  public addTrip(formData: Trip): Promise<Trip>{
    console.log('Inside TripDataService#addTrip');
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("travlr-token")}`,
    });
    return this.http
      .post(this.tripUrl, formData, {headers: headers})
      .toPromise()
      .then((response) =>response.json() as Trip[])
      .catch(this.handleError);
  }

  public updateTrip(formData: Trip): Promise<Trip>{
    console.log('Inside TripDataService#updatesTrip');
    console.log(formData);
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("travlr-token")}`,
    });
    return this.http
      .put(this.tripUrl + formData.code, formData, {headers: headers})
      .toPromise()
      .then((response) => response.json() as Trip[])
      .catch(this.handleError);
  }

  public deleteTrip(code: string): Promise<Trip>{
    console.log('Inside deleteTrip-TripDataService');
    console.log('Deleting ' + this.tripUrl + ' ' + code);
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("travlr-token")}`,
    });
    return this.http
    .delete(this.tripUrl, code)
    .toPromise()
    .then((response) => response.json() as Trip[])
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  public login(user: Users): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: Users): Promise<AuthResponse>{
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, user: Users): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post(url, user)
      .toPromise()
      .then((response) => response.json() as AuthResponse)
      .catch(this.handleError);
  }
}
