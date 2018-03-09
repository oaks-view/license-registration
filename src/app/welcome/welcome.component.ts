import { Component, Output, ViewChild, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
    title = 'welcome component';

    constructor(private _router: Router) {
        //
    }

    goToSignInAndRegistrationScreen() {
        this._router.navigateByUrl('/signup');
    }
}
