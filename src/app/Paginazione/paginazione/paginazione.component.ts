import { Component } from '@angular/core';
import { HeaderComponent } from "../../Home/header/header.component";
import { DropdownsComponent } from "../../Home/dropdowns/dropdowns.component";
import { FiltroComponent } from "../filtro/filtro.component";
import { CardprodottoComponent } from "../../Prodotto/cardprodotto/cardprodotto.component";
import { CountpagComponent } from "../countpag/countpag.component";
import { FooterComponent } from "../../Home/footer/footer.component";

@Component({
  selector: 'app-paginazione',
  standalone: true,
  imports: [HeaderComponent, DropdownsComponent, FiltroComponent, CardprodottoComponent, CountpagComponent, FooterComponent],
  templateUrl: './paginazione.component.html',
  styleUrl: './paginazione.component.css'
})
export class PaginazioneComponent {

}
