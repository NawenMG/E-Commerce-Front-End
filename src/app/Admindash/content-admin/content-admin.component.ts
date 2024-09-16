import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-content-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './content-admin.component.html',
  styleUrl: './content-admin.component.css'
})
export class ContentAdminComponent {
  rows: Array<{ info1: string, info2: string, info3: string }> = [
    { info1: 'Informazione', info2: 'Informazione', info3: 'Informazione' },  // Prima riga
    { info1: 'Informazione', info2: 'Informazione', info3: 'Informazione' }   // Seconda riga
  ];

  // Funzione per aggiungere una nuova riga
  addRow() {
    this.rows.push({ info1: 'Informazione', info2: 'Informazione', info3: 'Informazione' });
  }

}
