import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

import {SharedService} from "../shared.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  username = '';
  password = '';

  message = '';

  constructor(private sharedService: SharedService, public authService: AuthService, public router: Router, ) {}

  ngOnInit() {
    this.newMessage(this.username);
  }

  login() {
    this.authService.login().subscribe(() => {
      if (this.authService.isLoggedIn) {
        // Usually you would use the redirect URL from the auth service.
        // However to keep the example simple, we will always redirect to `/admin`.
        const redirectUrl = '/chat';
        this.newMessage(this.username);
        // Redirect the user
        //this.router.navigate([redirectUrl]);
        this.router.navigate([redirectUrl]);
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  newMessage(username: string) {
    this.sharedService.nextMessage(username);
  }

}
