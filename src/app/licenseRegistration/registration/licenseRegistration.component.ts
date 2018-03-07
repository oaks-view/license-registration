import { Component, Output, ViewChild, EventEmitter, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { LicenseApplication } from '../../shared/models/licenseApplication.model';
import { LicenseApplicationStatus } from '../../shared/models/licenseApplicationStatus';
import { DatabaseNodes } from '../../shared/models/databaseNodes.model';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

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
        private _db: AngularFireDatabase) {
        // this._licenseApplicationsRef = _db.object('licenseRegistration');
        // this.licenseApplication = this._licenseApplicationsRef.valueChanges();

        // this.newApplication = new LicenseApplication();
    }

    @ViewChild('frm') form;
    get formIsValid(): boolean {
        return this.form.valid;
    }

    submitApplication() {
        this.spinnerService.show();

        try {
            this._licenseApplicationsRef.push(<any>this.newApplication.toDto()).then(() => {
                this.spinnerService.hide();
            });
        }

        catch(error) {
            this.spinnerService.hide();
            console.log(error);
        }

        // this._licenseApplicationsRef.set(this.newApplication).then(() => {
        //     alert('succeefully saved data');
        //     this.spinnerService.hide();
        // }).catch(error => {
        //     this.spinnerService.hide();
        //     console.log('ERROR ERROR ERROR');
        //     console.log(error);
        // });
    }

    ngOnInit(): void {
        this.newApplication = new LicenseApplication();
        this._licenseApplicationsRef = this._db.list(DatabaseNodes.licenseApplications);
    }
}