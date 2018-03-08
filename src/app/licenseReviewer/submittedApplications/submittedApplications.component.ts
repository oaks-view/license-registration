import { Component, Output, ViewChild, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import { LicenseApplication } from '../../shared/models/licenseApplication.model';
import { LicenseApplicationStatus } from '../../shared/models/licenseApplicationStatus';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DatabaseNodes } from '../../shared/models/databaseNodes.model';

@Component({
    selector: 'app-submitted-application',
    templateUrl: './submittedApplications.component.html'
})
export class SubmittedApplicationsComponent implements OnInit{
    licenseApplicationRef: AngularFireList<LicenseApplication>;
    submittedApplications: Observable<LicenseApplication[]>;
    selectedApplication: LicenseApplication;

    constructor(
        private spinnerService: Ng4LoadingSpinnerService,
        private _db: AngularFireDatabase
    ) {}

    setSelectedApplication(application) {
        this.selectedApplication = application;
        console.log(`selected application key ${application.$key}`);
    }

    updateSelectedApplicationStatus() {
      }

    ngOnInit(): void {
        this.licenseApplicationRef = this._db.list(DatabaseNodes.LICENSE_APPLICATIONS);
        this.submittedApplications = this.licenseApplicationRef.valueChanges();
        console.log(this.submittedApplications);
    }
}
