import { Component } from '@angular/core';
import { Header2Component } from "../header2/header2.component";
import { Title3Component } from "../title3/title3.component";
import { Filtro2Component } from "../../Deliverydash/filtro2/filtro2.component";
import { ContentDelivery2Component } from "../content-delivery-2/content-delivery-2.component";
import { FooterComponent } from "../../Home/footer/footer.component";

@Component({
  selector: 'app-pay-dash',
  standalone: true,
  imports: [Header2Component, Title3Component, Filtro2Component, ContentDelivery2Component, FooterComponent],
  templateUrl: './pay-dash.component.html',
  styleUrl: './pay-dash.component.css'
})
export class PayDashComponent {

}
