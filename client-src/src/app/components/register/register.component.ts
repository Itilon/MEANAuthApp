import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: string;
  email: String;
  password: String

  constructor(private router: Router, private flashMessagesService: FlashMessagesService, private validateService: ValidateService, private authService: AuthService) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    if (!this.validateService.validateRegister(user)) {
      this.flashMessagesService.show('Please, fill in all fields.', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessagesService.show('Please, enter a valid email.', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessagesService.show('You are now registered and can log in.', { cssClass: 'alert-success', timeout: 3000 });
        return this.router.navigate(['/login']);
      }

      this.flashMessagesService.show('Something went wrong.', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    });
  }

}
