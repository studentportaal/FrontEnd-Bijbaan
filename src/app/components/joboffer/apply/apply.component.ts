import {Component, OnInit} from '@angular/core';
import {JobofferService} from '../../../services/joboffer/joboffer.service';
import {Student} from '../../../domain/Student';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";
import {AuthenticationService} from "../../../services/authentication/authentication.service";

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {

  user: Student;
  id: string;

  constructor(private route: ActivatedRoute,
              private jobOfferService: JobofferService,
              private snackbar: MatSnackBar,
              private router: Router,
              private authenticationService: AuthenticationService) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  onSubmit() {
    this.jobOfferService.applyForJob(this.user, this.id).subscribe((jobofffer) => {
      const snackbarRef = this.snackbar.open('Succesvol aangemeld voor de vacature', 'dismiss', {
        duration: 1500
      });
      snackbarRef.afterDismissed().subscribe(() => {
        this.router.navigateByUrl('/');
      });
    });
  }
}
