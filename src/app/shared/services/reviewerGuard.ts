import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import * as _ from 'lodash';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class ReviewerGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {

        // let canActivate = this.auth.loggedInUserRoles.reviewer || false;

        // this.auth.applicationUser.map(user => {
        //     if (user.roles.reviewer) {
        //         canActivate = true;
        //     }
        // })

        return this.auth.applicationUser
            .take(1)
            .map(user => {
                return user.roles.reviewer || false;
            }).do(canActivate => {
                if (!canActivate) {
                    console.log('cannot access this route');
                    this.router.navigateByUrl('/welcome');
                }
            });

        // return this.auth.user
        //     .take(1)
        //     .map(user => _.has(_.get(user, 'roles'), 'author'))
        //     .do(authorized => {
        //         if (!authorized) {
        //             console.log('route prevented!')
        //             //  this.router.navigate(['/']);
        //         }
        //     })

        // return canActivate;
    }
}