import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {ReviewService} from "../../../services/review/review.service";
import {ActivatedRoute} from "@angular/router";
import {Review} from "../../../domain/Review";
import {CompanyService} from "../../../services/company/company.service";
import {UserService} from "../../../services/user/user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.scss']
})
export class WriteReviewComponent implements OnInit {
  reviews: Review[];
  targets: string[] = [];

  constructor(private authService: AuthenticationService,
              private reviewService: ReviewService,
              private activatedRoute: ActivatedRoute,
              private companyService: CompanyService,
              private studentService: UserService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.author;
      this.reviewService.getReviews('', id, false).subscribe((reviews) => {
        this.reviews = reviews;
        console.log(reviews);
        this.reviews.forEach((review) => {
          this.getReviewTarget(review.target);
        });
      });
    });
  }

  async getReviewTarget(target: string) {
    let targetResult;
    if (this.authService.isStudent()) {
       await this.companyService.getCompany(target).toPromise().then((company) => {
         targetResult = company.name;
      });
    } else {
      await this.studentService.getUserById(target).toPromise().then((student) => {
        targetResult = student.firstName + ' ' + student.lastName;
      });
    }
    console.log(targetResult);
    this.targets.push(targetResult);
  }

  save(i: number) {
    const review = this.reviews[i];
    review.written = true;
    console.log(review);
    this.reviewService.updateReview(review).subscribe((response) => {
      console.log('done');
    })
  }

}
