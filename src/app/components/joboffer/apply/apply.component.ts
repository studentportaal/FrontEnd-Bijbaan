import {Component, OnInit} from '@angular/core';
import {JobofferService} from '../../../services/joboffer/joboffer.service';
import {User} from '../../../domain/User';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {

  user: User = new User();
  id: string;

  constructor(private route: ActivatedRoute,
              private jobOfferService: JobofferService,
              private snackbar: MatSnackBar,
              private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }

  onSubmit() {
    this.jobOfferService.applyForJob(this.user, this.id).subscribe((jobofffer) => {
      const snackbarRef = this.snackbar.open('Succesvol aangemeld voor de vacature', 'dismiss', {
        duration: 3000
      });
      snackbarRef.afterDismissed().subscribe(() => {
        this.router.navigateByUrl('/');
      });
    });
  }
}
