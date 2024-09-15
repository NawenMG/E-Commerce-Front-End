import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms-series',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './forms-series.component.html',
  styleUrls: ['./forms-series.component.css']
})
export class FormsSeriesComponent {
  groupForms: FormGroup;

  constructor() {
    this.groupForms = new FormGroup({
      Credenziale1: new FormControl('', [Validators.required, Validators.minLength(5)]),
      Credenziale2: new FormControl('', [Validators.required, Validators.minLength(5)]),
      Credenziale3: new FormControl('', [Validators.required, Validators.minLength(5)]),
      Credenziale4: new FormControl('', [Validators.required, Validators.minLength(5)]),

      Condizione1: new FormControl('', Validators.requiredTrue),
      Condizione2: new FormControl('', Validators.requiredTrue),

      Info1: new FormControl('', Validators.maxLength(10)),
      Info2: new FormControl('', Validators.maxLength(10)),
      Info3: new FormControl('', Validators.maxLength(10)),
      Info4: new FormControl('', Validators.maxLength(10)),
      Info5: new FormControl('', Validators.maxLength(10)),
      Info6: new FormControl('', Validators.maxLength(10)),

      Immagine: new FormControl('' ),

      Check1: new FormControl(''),
      Check2: new FormControl(''),
      Check3: new FormControl(''),
      Check4: new FormControl(''),
      Check5: new FormControl('')


    });
  }

  credenziale1: string = '';
  credenziale2: string = '';
  credenziale3: string = '';
  credenziale4: string = '';
  credenziale5: string = '';
  credenziale6: string = '';

  condizione1: boolean = false;
  condizione2: boolean = false;

  info1: string = '';
  info2: string = '';
  info3: string = '';
  info4: string = '';
  info5: string = '';
  info6: string = '';

  immagine: string ='';

  check1: boolean = false;
  check2: boolean = false;
  check3: boolean = false;
  check4: boolean = false;

  onSubmit() {
    if (this.groupForms.valid) {
      console.log(this.groupForms.value);
      alert("Dati inviati");
    } else {
      alert("Ci sono errori nel form");
    }


    this.credenziale1 = this.groupForms.get('Credenziale1')?.value;
    this.credenziale2 = this.groupForms.get('Credenziale2')?.value;
    this.credenziale3 = this.groupForms.get('Credenziale3')?.value;
    this.credenziale4 = this.groupForms.get('Credenziale4')?.value;

    this.condizione1 = this.groupForms.get('Condizione1')?.value;
    this.condizione2 = this.groupForms.get('Condizione2')?.value;

    this.info1 = this.groupForms.get('Info1')?.value;
    this.info2 = this.groupForms.get('Info2')?.value;
    this.info3 = this.groupForms.get('Info3')?.value;
    this.info4 = this.groupForms.get('Info4')?.value;
    this.info5 = this.groupForms.get('Info5')?.value;
    this.info6 = this.groupForms.get('Info6')?.value;

    this.immagine = this.groupForms.get('Immagine')?.value;

    this.check1 = this.groupForms.get('Check1')?.value;
    this.check2 = this.groupForms.get('Check2')?.value;
    this.check3 = this.groupForms.get('Check3')?.value;
    this.check4 = this.groupForms.get('Check4')?.value;





    alert("Dati inviati");
  }
}
