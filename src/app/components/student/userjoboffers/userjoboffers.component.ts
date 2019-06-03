import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { JobOffer } from 'src/app/domain/JobOffer';
import { MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material';

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

  getAppliedApplications(id: string) {
    this.userService.getAppliedApplications(id).subscribe(response => {
      this.jobOffers = response;
      this.filterOnUser();
      this.dataSource = new MatTableDataSource(this.jobOffers);
      this.dataSource.sort = this.sort;
    });
  }

  filterOnUser() {
    if (this.jobOffers) {
      this.jobOffers.forEach(j => {
        j.applications = j.applications.filter(a => a.applicant.uuid === this.authenticationService.user.uuid);
      });
    }
  }
}
