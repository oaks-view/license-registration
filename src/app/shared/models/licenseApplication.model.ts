import { LicenseApplicationStatus } from './licenseApplicationStatus';

export class LicenseApplication {
    id: string = null;
    firstName: string = null;
    lastName: string = null;
    dateOfBirth: Date = null;
    stateOfOrigin: string = null;
    occupation: string = null;
    email: string = null;
    address: string = null;
    status: string = null;
    created: string = null;
    lastModified: Date = null;
    reviewed: boolean = false;
    approved: boolean = false;
    rejected: boolean = false;

    toDto() {
        let date = new Date();
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            dateOfBirth: this.dateOfBirth,
            stateOfOrigin: this.stateOfOrigin,
            occupation: this.occupation,
            address: this.address,
            email: this.email,
            status: LicenseApplicationStatus.submitted,
            created: date.toLocaleDateString(),
            lastModified: date.toLocaleDateString(),
            reviewed: this.reviewed,
            approved: this.approved,
            rejected: this.rejected
        }
    }

    get isValid() {
        return !!this.firstName && !!this.lastName && !!this.dateOfBirth && !! this.occupation
        && !!this.email && !!this.email && this.address;
    }

    get applicantFullname() {
        return this.firstName + ' ' + this.lastName;
    }
}