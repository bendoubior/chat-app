import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

import {SharedService} from "../shared.service";
import {MessageClientService} from "../message-client.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  username = '';
  password = '';

  message = '';

  constructor(private sharedService: SharedService, public authService: AuthService, public router: Router, public messageService: MessageClientService) {}

  ngOnInit() {
    this.newMessage(this.username);
  }

  login() {
    this.authService.login().subscribe(() => {
      if (!this.authService.isLoggedIn) {
        if(this.isValid()) {
          const redirectUrl = '/chat';
          this.newMessage(this.username);

          this.authService.isLoggedIn = true;
          this.router.navigate([redirectUrl]);
        }
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  newMessage(username: string) {
    this.sharedService.nextMessage(username);
  }

  isValid() {
    if(this.username == ''){
      alert("cannot specify empty username");
      return false;
    }
    if(this.password.length <= 8){
      alert("passwords must be at least 8 characters long");
      return false;
    }
    return true;
  }

}
