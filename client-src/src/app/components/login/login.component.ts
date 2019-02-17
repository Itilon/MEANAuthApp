import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(private router: Router, private flashMessagesService: FlashMessagesService, private authService: AuthService) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashMessagesService.show('You are now logged in.', { cssClass: 'alert-success', timeout: 3000 });
        return this.router.navigate(['/dashboard']);
      }

      this.flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    });
  }

}
