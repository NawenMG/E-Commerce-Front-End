import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header2',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './header2.component.html',
  styleUrl: './header2.component.css'
})
export class Header2Component {
  inputSearch = "";


}
