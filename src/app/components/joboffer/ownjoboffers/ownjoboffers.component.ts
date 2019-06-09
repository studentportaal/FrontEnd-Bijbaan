import {Component, OnInit, ViewChild} from '@angular/core';
import {JobofferlistComponent} from "../Offerslist/jobofferlist.component";
import {AuthenticationService} from "../../../services/authentication/authentication.service";

@Component({
  selector: 'app-ownjoboffers',
  templateUrl: './ownjoboffers.component.html',
  styleUrls: ['./ownjoboffers.component.scss']
})
export class OwnjoboffersComponent implements OnInit {

  @ViewChild(JobofferlistComponent)
  private jobofferListComponent: JobofferlistComponent;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.jobofferListComponent.isOwnJoboffers = true;
    this.jobofferListComponent.companies.push(this.authenticationService.user.uuid);
  }

}
