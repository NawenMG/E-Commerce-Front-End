import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { DropdownsComponent } from "../dropdowns/dropdowns.component";
import { CarouselComponent } from "../carousel/carousel.component";
import { CarouselseriesComponent } from "../carouselseries/carouselseries.component";
import { FooterComponent } from "../footer/footer.component";
import { Route, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterModule ,HeaderComponent, DropdownsComponent, CarouselComponent, CarouselseriesComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
