import { Component, OnInit, ApplicationInitStatus, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { JobOffer } from 'src/app/domain/JobOffer';
import { MatTableDataSource, MatSort } from '@angular/material';


@Component({
  selector: 'app-userjoboffers',
  templateUrl: './userjoboffers.component.html',
  styleUrls: ['./userjoboffers.component.scss']
})
export class UserjoboffersComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  jobOffers: JobOffer[];
  dataSource = new MatTableDataSource(this.jobOffers);

  constructor(private userService: UserService,
              public authenticationService: AuthenticationService) { }

  ngOnInit() {
    if (this.authenticationService.isStudent()) {
      this.getAppliedApplications(this.authenticationService.user.uuid);
    }
  }
  ngAfterInit() {
    this.dataSource = new MatTableDataSource(this.jobOffers);
    this.dataSource.sort = this.sort;
  }


  getAppliedApplications(id: string) {
    this.userService.getAppliedApplications(id).subscribe((response: any) => {
      this.jobOffers = response;
      this.filterOnUser();
      this.dataSource = new MatTableDataSource(this.jobOffers);
    });
  }

  filterOnUser() {
    if (this.jobOffers) {
      if (this.jobOffers.filter(x => x.applications.filter(a => a.applicant.uuid === this.authenticationService.user.uuid)).length > 0) {
        return this.jobOffers = this.jobOffers.filter(x => x.applications.filter(a => a.applicant.uuid === this.authenticationService.user.uuid));
      }
    }
  }
}
