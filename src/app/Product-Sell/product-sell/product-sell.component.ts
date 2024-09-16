import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-sell',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-sell.component.html',
  styleUrl: './product-sell.component.css'
})
export class ProductSellComponent {
  groupForms: FormGroup;

  constructor(){
    this.groupForms = new FormGroup({
      Nome: new FormControl('', Validators.required),

      Prezzo: new FormControl('', [Validators.required, Validators.min(0.10)]),

      Descrizione: new FormControl('',),

      Amount: new FormControl('', [Validators.required, Validators.min(1)]),

      Info1: new FormControl(''),
      Info2: new FormControl(''),
      Info3: new FormControl(''),
      Info4: new FormControl(''),
      Info5: new FormControl(''),
      Info6: new FormControl(''),

      Immagine: new FormControl('', Validators.required),

      Scheda1: new FormControl(''),
      Scheda2: new FormControl(''),
      Scheda3: new FormControl(''),
      Scheda4: new FormControl(''),
      Scheda5: new FormControl(''),
      Scheda6: new FormControl(''),
      Scheda7: new FormControl(''),
      Scheda8: new FormControl(''),
    });
  }

  nome: string = '';

  prezzo: number = 0;

  descrizione: string = '';

  amount: number = 0;

  info1: string = '';
  info2: string = '';
  info3: string = '';
  info4: string = '';
  info5: string = '';
  info6: string = '';

  immagine: string = '';

  scheda1: string = '';
  scheda2: string = '';
  scheda3: string = '';
  scheda4: string = '';
  scheda5: string = '';
  scheda6: string = '';
  scheda7: string = '';
  scheda8: string = '';

  rows: Array<{ col1: string, col2: string, col3: string, col4: string }> = [
    { col1: '', col2: '', col3: '', col4: '' }, // Rappresenta la prima riga iniziale
    { col1: '', col2: '', col3: '', col4: '' }  // Rappresenta la seconda riga iniziale
  ];

  // Funzione per aggiungere una nuova riga
  addRow() {
    this.rows.push({ col1: '', col2: '', col3: '', col4: '' });
  }

  onSubmit(){
    if (this.groupForms.valid) {
      console.log(this.groupForms.value);
      alert("Dati inviati");
    } else {
      alert("Ci sono errori nel form");
    }

    this.nome = this.groupForms.get('Nome')?.value;

    this.prezzo = this.groupForms.get('Prezzo')?.value;

    this.descrizione = this.groupForms.get('Descrizione')?.value;

    this.amount = this.groupForms.get('Amount')?.value;

    this.info1 = this.groupForms.get('Info1')?.value;
    this.info2 = this.groupForms.get('Info2')?.value;
    this.info3 = this.groupForms.get('Info3')?.value;
    this.info4 = this.groupForms.get('Info4')?.value;
    this.info5 = this.groupForms.get('Info5')?.value;
    this.info6 = this.groupForms.get('Info6')?.value;

    this.immagine = this.groupForms.get('Immagine')?.value;

    this.scheda1 = this.groupForms.get('Scheda1')?.value;
    this.scheda2 = this.groupForms.get('Scheda2')?.value;
    this.scheda3 = this.groupForms.get('Scheda3')?.value;
    this.scheda4 = this.groupForms.get('Scheda4')?.value;
    this.scheda5 = this.groupForms.get('Scheda5')?.value;
    this.scheda6 = this.groupForms.get('Scheda6')?.value;
    this.scheda7 = this.groupForms.get('Scheda7')?.value;
    this.scheda8 = this.groupForms.get('Scheda8')?.value;

    alert("Dati inviati");





  }


}
