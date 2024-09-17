import { Component } from '@angular/core';
import { HeaderComponent } from "../../Home/header/header.component";
import { DropdownsComponent } from "../../Home/dropdowns/dropdowns.component";
import { CardprodottoComponent } from "../cardprodotto/cardprodotto.component";
import { AccordionsprodottoComponent } from "../accordionsprodotto/accordionsprodotto.component";
import { CardaziendaComponent } from "../cardazienda/cardazienda.component";
import { CarouselseriesComponent } from "../../Home/carouselseries/carouselseries.component";
import { DomandeERisposteComponent } from "../domande-e-risposte/domande-e-risposte.component";
import { ReviewsComponent } from "../reviews/reviews.component";
import { FooterComponent } from "../../Home/footer/footer.component";

@Component({
  selector: 'app-prodotto',
  standalone: true,
  imports: [HeaderComponent, DropdownsComponent, CardprodottoComponent, AccordionsprodottoComponent, CardaziendaComponent, CarouselseriesComponent, DomandeERisposteComponent, ReviewsComponent, FooterComponent],
  templateUrl: './prodotto.component.html',
  styleUrl: './prodotto.component.css'
})
export class ProdottoComponent {

}
