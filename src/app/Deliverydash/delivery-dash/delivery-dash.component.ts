import { Component } from '@angular/core';
import { HeaderComponent } from "../../Deliverydash/header/header.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Filtro2Component } from "../filtro2/filtro2.component";
import { Title2Component } from "../title2/title2.component";
import { ContentDeliveryComponent } from "../content-delivery/content-delivery.component";
import { FooterComponent } from "../../Home/footer/footer.component";

@Component({
  selector: 'app-delivery-dash',
  standalone: true,
  imports: [HeaderComponent, Filtro2Component, Title2Component, ContentDeliveryComponent, FooterComponent],
  templateUrl: './delivery-dash.component.html',
  styleUrl: './delivery-dash.component.css'
})
export class DeliveryDashComponent {

}
