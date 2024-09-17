import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RatingreviewsComponent } from './ratingreviews/ratingreviews.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cardsprodotti',
  standalone: true,
  imports: [CommonModule, RatingreviewsComponent, RouterModule],
  templateUrl: './cardsprodotti.component.html',
  styleUrl: './cardsprodotti.component.css'
})
export class CardsprodottiComponent {
  immagine1:string = "https://plus.unsplash.com/premium_photo-1683746792239-6ce8cdd3ac78?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww";
  immagine2:string = "https://plus.unsplash.com/premium_photo-1664201890375-f8fa405cdb7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww";
  immagine3:string = "https://plus.unsplash.com/premium_photo-1683746792467-c6ae33d06c20?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGUlMjBjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D";

  numeri:number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

}
