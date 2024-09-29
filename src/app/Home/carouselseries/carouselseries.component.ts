import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-carouselseries',
  templateUrl: './carouselseries.component.html',
  styleUrls: ['./carouselseries.component.css'],
  standalone: true,
  imports:[CommonModule]
})
export class CarouselseriesComponent implements AfterViewInit {
  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>; // Usa l'operatore di non-null assertion
  leftIcon!: HTMLElement; // Dichiarazione della freccia sinistra
  rightIcon!: HTMLElement; // Dichiarazione della freccia destra

  images: string[] = [
    'https://plus.unsplash.com/premium_photo-1683746792239-6ce8cdd3ac78?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1664201890375-f8fa405cdb7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1683746792467-c6ae33d06c20?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGUlMjBjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1683746792239-6ce8cdd3ac78?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1664201890375-f8fa405cdb7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1683746792467-c6ae33d06c20?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGUlMjBjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1683746792239-6ce8cdd3ac78?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1664201890375-f8fa405cdb7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1683746792467-c6ae33d06c20?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGUlMjBjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D',




  ];

  ngAfterViewInit() {
    this.leftIcon = document.getElementById('left') as HTMLElement; // Accedi all'elemento dopo la visualizzazione
    this.rightIcon = document.getElementById('right') as HTMLElement; // Accedi all'elemento dopo la visualizzazione
    this.updateIcons();
  }

  scrollLeft() {
    const scrollWidth = this.carousel.nativeElement.scrollWidth - this.carousel.nativeElement.clientWidth;
    this.carousel.nativeElement.scrollLeft -= this.carousel.nativeElement.clientWidth / 3; // Scorrimento a sinistra
    this.updateIcons();
  }

  scrollRight() {
    this.carousel.nativeElement.scrollLeft += this.carousel.nativeElement.clientWidth / 3; // Scorrimento a destra
    this.updateIcons();
  }

  updateIcons() {
    const scrollLeft = this.carousel.nativeElement.scrollLeft;
    const scrollWidth = this.carousel.nativeElement.scrollWidth - this.carousel.nativeElement.clientWidth;

    this.leftIcon.style.display = scrollLeft === 0 ? 'none' : 'block';
    this.rightIcon.style.display = scrollLeft >= scrollWidth ? 'none' : 'block';
  }
}
