import {Component, OnInit} from '@angular/core';
import {JobofferService} from '../../../services/joboffer/joboffer.service';
import {Student} from '../../../domain/Student';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {Application} from "../../../domain/Application";
import {CvService} from "../../../services/cvs/cv.service";
import {JobOffer} from "../../../domain/JobOffer";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {TranslateService} from "@ngx-translate/core";

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
  application: Application = new Application();
  public Editor = ClassicEditor;

  constructor(private route: ActivatedRoute,
              private jobOfferService: JobofferService,
              private cvService: CvService,
              private snackbar: MatSnackBar,
              private translationService: TranslateService,
              private router: Router,
              private authenticationService: AuthenticationService) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.translationService.get("APPLICATION.LABEL.MOTIVATIONLETTER").subscribe(translatedText => this.application.motivationLetter = translatedText);
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
    application.motivationLetter = this.application.motivationLetter;
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
