import {Component, OnInit} from '@angular/core';
import {JobofferService} from '../../../services/joboffer/joboffer.service';
import {Student} from '../../../domain/Student';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {Application} from "../../../domain/Application";
import {CvService} from "../../../services/cvs/cv.service";
import {JobOffer} from "../../../domain/JobOffer";

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {

  user: Student;
  files: File[];
  id: string;
  fileToUpload: File;
  jobOffer: JobOffer;
  selectedFile: string;

  constructor(private route: ActivatedRoute,
              private jobOfferService: JobofferService,
              private cvService: CvService,
              private snackbar: MatSnackBar,
              private router: Router,
              private authenticationService: AuthenticationService) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.user = this.authenticationService.user as Student;
    this.getJobOffer();
    this.initializeFiles();
  }

  private initializeFiles() {
    this.cvService.getMyFiles().subscribe((jsonFiles) => {
      this.files = jsonFiles;
    });
  }

  private getJobOffer() {
    this.jobOfferService.getJobOffer(this.id).subscribe((jo) => this.jobOffer = jo);
  }

  async onSubmit() {
    const application = new Application();
    application.applicant = this.user;
    application.accepted = false;
    if (this.fileToUpload) {
      await this.cvService.uploadFile(this.fileToUpload, this.jobOffer.id, this.jobOffer.company);
    } else if (this.selectedFile != null) {
      this.cvService.permitFile(this.selectedFile, this.jobOffer.id, this.jobOffer.company);
    }

    this.jobOfferService.applyForJob(application, this.id).subscribe((jobofffer) => {
     this.snackbar.open('Succesvol aangemeld voor de vacature', 'dismiss', {
       duration: 1500
      });

      this.router.navigateByUrl('/');
    });
  }
}
