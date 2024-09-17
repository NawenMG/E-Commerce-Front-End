import { Component } from '@angular/core';
import { ImmagineComponent } from "../immagine/immagine.component";
import { InfoCredenzialiComponent } from "../info-credenziali/info-credenziali.component";

@Component({
  selector: 'app-profilo',
  standalone: true,
  imports: [ImmagineComponent, InfoCredenzialiComponent],
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.css'
})
export class ProfiloComponent {

}
