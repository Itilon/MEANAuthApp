import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private router: Router, private flashMessagesService: FlashMessagesService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(data => {
      this.user = data.user;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onSubmit() {
    this.authService.updateUser(this.user, this.user._id).subscribe(data => {
      if (data.success) {
        this.flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
        return true;
      }

      this.flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    });
  }

  onBtnClick() {
    this.authService.deleteUser(this.user._id).subscribe(data => {
      if (data.success) {
        this.flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
        return this.router.navigate(['/']);
      }

      this.flashMessagesService.show('Something went wrong.', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
