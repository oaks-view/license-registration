import { Component, Output, ViewChild, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import { LicenseApplication } from '../../shared/models/licenseApplication.model';
import { LicenseApplicationStatus } from '../../shared/models/licenseApplicationStatus';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DatabaseNodes } from '../../shared/models/databaseNodes.model';
import { User, Roles } from '../../shared/models/user.model';
import { ToasterService} from 'angular2-toaster';

@Component({
    selector: 'app-submitted-application',
    templateUrl: './submittedApplications.component.html'
})
export class SubmittedApplicationsComponent implements OnInit{
    licenseApplicationRef: AngularFireList<LicenseApplication>;
    allApplications: Observable<LicenseApplication[]>;
    submittedApplications: Observable<LicenseApplication[]>;
    selectedApplication: LicenseApplication;

    constructor(
        private spinnerService: Ng4LoadingSpinnerService,
        private _db: AngularFireDatabase,
        private _toaster: ToasterService
    ) {}

    setSelectedApplication(application) {
        this.selectedApplication = application;
        console.log(`selected application key ${application.$key}`);
    }

    approveSelectedApplication() {
        let ref = this._db.object('licenseApplications/' + this.selectedApplication.id);

        this.spinnerService.show();

        ref.update({reviewed: true }).then(() => {
            this.spinnerService.hide();
            this._toaster.pop('success', 'Succesful', 'Application successfully reviewd!')
        }).catch((error) => {
            this.spinnerService.hide();
            this._toaster.pop('error', 'An Error occured', error.message);
            console.error(error.message);
        })
      }

      rejectSelectedApplication() {
        let ref = this._db.object('licenseApplications/' + this.selectedApplication.id);

        this.spinnerService.show();

        ref.update({rejected: true }).then(() => {
            this.spinnerService.hide();
            this._toaster.pop('info', 'Successful', 'Application successfully rejected!');
        }).catch((error) => {
            this.spinnerService.hide();
            this._toaster.pop('error', 'An error occured', error.message);
            console.error(error.message);
        })
      }

    ngOnInit(): void {
        this.licenseApplicationRef = this._db.list(DatabaseNodes.LICENSE_APPLICATIONS);
        this.allApplications = this.licenseApplicationRef.valueChanges();

        this.submittedApplications = this.allApplications.map( applications => {
            return applications.filter( x => !x.reviewed && !x.rejected);
        } )
            
        console.log(this.submittedApplications);
    }
}
