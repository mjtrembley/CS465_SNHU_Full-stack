import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    if (this.isLoggedIn() == true){
        return this.authenticationService.getCurrentUser();
    }
  }
  
  public isLoggedIn(): boolean{
    return this.authenticationService.isLoggedIn();
  }

}