import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-welcome',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    title = 'welcome component';

    constructor(private _router: Router, public auth: AuthService) {
        //
    }

    goToSignInAndRegistrationScreen() {
        this._router.navigateByUrl('/signup');
    }
}
