import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { PComponent } from './p/p.component';
import { HeaderComponent } from "./Home/header/header.component";
import { DropdownsComponent } from './Home/dropdowns/dropdowns.component';
import { CarouselComponent } from "./Home/carousel/carousel.component";
import { CarouselseriesComponent } from "./Home/carouselseries/carouselseries.component";
import { FooterComponent } from "./Home/footer/footer.component";
import { CardsprodottiComponent } from './Paginazione/cardsprodotti/cardsprodotti.component';
import { FiltroComponent } from "./Paginazione/filtro/filtro.component";
import { CountpagComponent } from "./Paginazione/countpag/countpag.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    PComponent,
    HeaderComponent,
    DropdownsComponent,
    CarouselComponent,
    CarouselseriesComponent,
    FooterComponent,
    CardsprodottiComponent,
    FiltroComponent,
    CountpagComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent {




}
