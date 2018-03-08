import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  collapse = true;
  isCollapse = true;

  constructor(public authService: AuthService, private router: Router) {
  }

  goToSigninScreen() {
    this.router.navigateByUrl('/signin');
  }

  signout() {
    this.authService.logout();
  }
}
