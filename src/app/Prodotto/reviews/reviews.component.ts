import { Component } from '@angular/core';
import { MediareviewsComponent } from "../mediareviews/mediareviews.component";
import { RatingreviewsComponent } from "../../Paginazione/cardsprodotti/ratingreviews/ratingreviews.component";

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [MediareviewsComponent, RatingreviewsComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {

}
