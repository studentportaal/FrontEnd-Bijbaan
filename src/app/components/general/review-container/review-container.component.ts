import {Component, Input, OnInit} from '@angular/core';
import {ReviewService} from "../../../services/review/review.service";
import {Review} from "../../../domain/Review";

@Component({
  selector: 'app-review-container',
  templateUrl: './review-container.component.html',
  styleUrls: ['./review-container.component.scss']
})
export class ReviewContainerComponent implements OnInit {

  reviews: Review[];

  @Input() target: string;

  constructor(private reviewService: ReviewService) { }

  ngOnInit() {
    this.reviewService.getReviews('34f70328-c183-447d-b63b-c1140311b35b', '', true).subscribe((reviews) => {
      this.reviews = reviews;
    });
  }

}
