import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-content-controller',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-controller.component.html',
  styleUrl: './content-controller.component.css'
})
export class ContentControllerComponent {
  rows: Array<{ info1: string, info2: string, info3: string }> = [
    { info1: 'Informazione', info2: 'Informazione', info3: 'Informazione' },  // Prima riga
    { info1: 'Informazione', info2: 'Informazione', info3: 'Informazione' }   // Seconda riga
  ];

  // Funzione per aggiungere una nuova riga
  addRow() {
    this.rows.push({ info1: 'Informazione', info2: 'Informazione', info3: 'Informazione' });
  }

}
