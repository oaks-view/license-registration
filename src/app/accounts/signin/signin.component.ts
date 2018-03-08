import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent {
    email: string;
    password: string;
    constructor(private _router: Router, private authService: AuthService) {}

    signinByEmailAndPassword($event) {
        $event.preventDefault();
        
        this.authService.signin(this.email, this.password);
    }

    goToSignupScreen() {
        this._router.navigateByUrl('/signup');
    }
}