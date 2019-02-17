import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private flashMessagesService: FlashMessagesService, private authService: AuthService) {}

    canActivate() {
        if (!this.authService.loggedIn()) {
            return true;
        }

        this.flashMessagesService.show('You are not allowed to see this page.', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/login']);
        return false;
    }
}