import { Component, Output, ViewChild, EventEmitter, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { LicenseApplication } from '../../shared/models/licenseApplication.model';
import { LicenseApplicationStatus } from '../../shared/models/licenseApplicationStatus';
import { DatabaseNodes } from '../../shared/models/databaseNodes.model';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-license-registration',
    templateUrl: './licenseRegistration.component.html'
})
export class LicenseRegistrationComponent implements OnInit {
    title = 'license registration component';
    licenseApplication: Observable<LicenseApplication>;
    newApplication: LicenseApplication;
    // _licenseApplicationsRef: AngularFireObject<LicenseApplication>
    _licenseApplicationsRef: AngularFireList<LicenseApplication>;

    stateOfOrigin: string;
    states: string[] = ['Lagos', 'Abuja', 'Nasarawa', 'Delta', 'Abia', 'Adamawa', 'Yola'];

    constructor(
        private spinnerService: Ng4LoadingSpinnerService,
        private _authService: AuthService,
        private _router: Router,
        private _db: AngularFireDatabase, ) {
    }

    @ViewChild('frm') form;
    get formIsValid(): boolean {
        return this.form.valid;
    }

    submitApplication() {
        this.spinnerService.show();

        try {
            let userId = this._authService.loggedInUserId;

            const ref = this._db.object<LicenseApplication>('licenseApplications/' + userId);

            this.newApplication.id = userId;


            ref.set(<any>this.newApplication.toDto()).then((reference) => {
                this.spinnerService.hide();
                this._authService.applicationSent = true;
                this._router.navigateByUrl('/home'); // todo change to a feedbac screen
            }).catch((error) => {
                this.spinnerService.hide();
                console.error(error.message);
            })
        }

        catch(error) {
            console.error(error.message);
            this.spinnerService.hide();
        }
    }

    ngOnInit(): void {
        this.newApplication = new LicenseApplication();
        this._licenseApplicationsRef = this._db.list(DatabaseNodes.LICENSE_APPLICATIONS);
    }
}