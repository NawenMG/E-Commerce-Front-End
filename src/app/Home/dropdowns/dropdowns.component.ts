import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dropdowns',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dropdowns.component.html',
  styleUrl: './dropdowns.component.css'
})
export class DropdownsComponent {
  categories:string[] = ["TECH", "MODA", "CASA", "BELLEZZA", "SPORT", "CULTURA"];

  sottoCategory1:string[] = ["Nome1", "Nome2", "Nome3", "Nome4", "Nome5", "Nome6"];

  sottoCategory2:string[] = ["Nome7", "Nome8", "Nome9", "Nome10", "Nome11", "Nome12"];

  sottoCategory3:string[] = ["Nome13", "Nome14", "Nome15", "Nome16", "Nome17", "Nome18"];

  sottoCategory4:string[] = ["Nome19", "Nome20", "Nome21", "Nome22", "Nome23", "Nome24"];

  sottoCategory5:string[] = ["Nome25", "Nome26", "Nome27", "Nome28", "Nome29", "Nome30"];

  sottoCategory6:string[] = ["Nome31", "Nome32", "Nome33", "Nome34", "Nome35", "Nome36"];



  categoriesDropdowns = [
    {
      name: "TECH",
      subcategories: ["Nome1", "Nome2", "Nome3", "Nome4", "Nome5", "Nome6"]
    },
    {
      name: "MODA",
      subcategories: ["Nome7", "Nome8", "Nome9", "Nome10", "Nome11", "Nome12"]
    },
    {
      name: "CASA",
      subcategories: ["Nome13", "Nome14", "Nome15", "Nome16", "Nome17", "Nome18"]
    },
    {
      name: "BELLEZZA",
      subcategories: ["Nome19", "Nome20", "Nome21", "Nome22", "Nome23", "Nome24"]
    },
    {
      name: "SPORT",
      subcategories: ["Nome25", "Nome26", "Nome27", "Nome28", "Nome29", "Nome30"]
    },
    {
      name: "CULTURA",
      subcategories: ["Nome31", "Nome32", "Nome33", "Nome34", "Nome35", "Nome36"]
    }
  ];










}
