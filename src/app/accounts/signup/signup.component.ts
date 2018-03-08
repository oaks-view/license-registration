import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {
    email: string;
    password: string;

    constructor(private authService: AuthService) {
    }

    signupWithEemailAndPassword($event) {
        $event.preventDefault();
        // alert(`email: ${this.email} password: ${this.password}`);
        console.log(`email: ${this.email} password: ${this.password}`)
        this.authService.signup(this.email, this.password);
    }

    signinWithGoogle() {
        this.authService.signInWithGoogle();
    }
}