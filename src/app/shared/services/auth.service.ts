import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';

import { User, Roles } from '../models/user.model';
import { DatabaseNodes } from '../models/databaseNodes.model';


@Injectable()
export class AuthService {
    user: Observable<firebase.User>;
    applicationUser: Observable<User>
    loggedInUserId: string;
    loggedInUserRoles: Roles;

    constructor(
        private firebaseAuth: AngularFireAuth,
        private _spinnerService: Ng4LoadingSpinnerService,
        private _router: Router,
        private _db: AngularFireDatabase
    ) {
        this.user = firebaseAuth.authState;
    }

    signup(email: string, password) {
        this._spinnerService.show();
        this.firebaseAuth
            .auth.createUserWithEmailAndPassword(email, password)
            .then((credentials) => {
                console.log(credentials);
                this.createUser(credentials);
                this.signin(email, password)
            })
            .catch((error) => {
                this._spinnerService.hide();
                console.log(error.message);
            })
    }

    signin(email: string, password: string) {
        this._spinnerService.show();

        this.firebaseAuth
            .auth.signInWithEmailAndPassword(email, password)
            .then((credential) => {
                console.log(credential);
                if (!this.applicationUser) {
                    this.setAppUser(credential);
                } 

                this._spinnerService.hide();
                this._router.navigateByUrl('/welcome');
            })
            .catch((error) => {
                this._spinnerService.hide();
                console.log(error.message);
            })
    }

    signInWithGoogle() {
        this._spinnerService.show()
        this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((credential) => {
                console.log(credential.user);
                this.createUser(credential.user);
            })
            .catch(error => {
                this._spinnerService.hide();
                console.log(error.message);
            });
    }

    logout() {
        this.firebaseAuth
            .auth
            .signOut()
            .then(() => {
                this._router.navigateByUrl('/signin');
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    private createUser(authData) {
        const newUser = new User(authData);
        const ref = this._db.object<User>('users/' + authData.uid);

        this.loggedInUserId = authData.uid;

        this.applicationUser = ref.valueChanges();

        ref.set(newUser).then((reference) => {
            this._spinnerService.hide();
            this._router.navigateByUrl('/welcome');
        }).catch((error) => {
            this._spinnerService.hide();
            console.error(error.message);
        })
    }

    private setAppUser(authData) {
        const ref = this._db.object<User>('users/' + authData.uid);
        this.loggedInUserId = authData.uid;

        this.applicationUser = ref.valueChanges();

        this.applicationUser.subscribe(user => {
            this.loggedInUserRoles = user.roles;
        })
    }
}