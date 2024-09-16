import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-content-delivery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-delivery.component.html',
  styleUrl: './content-delivery.component.css'
})
export class ContentDeliveryComponent {

  rows: Array<{ info1: string, info2: string, info3: string }> = [
    { info1: 'Informazione', info2: 'Informazione', info3: 'Informazione' },  // Prima riga
    { info1: 'Informazione', info2: 'Informazione', info3: 'Informazione' }   // Seconda riga
  ];

  // Funzione per aggiungere una nuova riga
  addRow() {
    this.rows.push({ info1: 'Informazione', info2: 'Informazione', info3: 'Informazione' });
  }
}
