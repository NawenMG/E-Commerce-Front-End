import { Component } from '@angular/core';
import { Header3Component } from "../header3/header3.component";
import { Title4Component } from "../title4/title4.component";
import { Filtro2Component } from "../../Deliverydash/filtro2/filtro2.component";
import { ContentAdminComponent } from "../content-admin/content-admin.component";
import { Title5Component } from "../title5/title5.component";
import { ContentAdmin2Component } from "../content-admin-2/content-admin-2.component";
import { FooterComponent } from "../../Home/footer/footer.component";

@Component({
  selector: 'app-admin-dash',
  standalone: true,
  imports: [Header3Component, Title4Component, Filtro2Component, ContentAdminComponent, Title5Component, ContentAdmin2Component, FooterComponent],
  templateUrl: './admin-dash.component.html',
  styleUrl: './admin-dash.component.css'
})
export class AdminDashComponent {

}
