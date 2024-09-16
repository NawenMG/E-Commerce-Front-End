import { Component } from '@angular/core';
import { Header5Component } from "../header5/header5.component";
import { Title6Component } from "../title6/title6.component";
import { Filtro2Component } from "../../Deliverydash/filtro2/filtro2.component";
import { ContentControllerComponent } from "../content-controller/content-controller.component";
import { Title7Component } from "../title7/title7.component";
import { ContentController2Component } from "../content-controller-2/content-controller-2.component";
import { FooterComponent } from "../../Home/footer/footer.component";

@Component({
  selector: 'app-controller-dash',
  standalone: true,
  imports: [Header5Component, Title6Component, Filtro2Component, ContentControllerComponent, Title7Component, ContentController2Component, FooterComponent],
  templateUrl: './controller-dash.component.html',
  styleUrl: './controller-dash.component.css'
})
export class ControllerDashComponent {

}
