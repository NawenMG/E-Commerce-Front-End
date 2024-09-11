import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdowns',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdowns.component.html',
  styleUrl: './dropdowns.component.css'
})
export class DropdownsComponent {
  categories: string[] = ["ELETTRONICA", "MODA", "CASA", "BELLEZZA", "SPORT", "CULTURA"];

  sottoCategories: string[] = ["Nome1", "Nome2", "Nome3", "Nome4", "Nome5", "Nome6"];


}
