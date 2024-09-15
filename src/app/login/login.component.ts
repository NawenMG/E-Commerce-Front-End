import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  groupForms: FormGroup;

  constructor() {
    this.groupForms = new FormGroup({
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', Validators.required)
    })
}

email: string = "";
password: string = "";

onSubmit() {
  if (this.groupForms.valid) {
    console.log(this.groupForms.value);
    alert("Dati inviati");
  } else {
    alert("Ci sono errori nel form");
  }

  this.email = this.groupForms.get('Email')?.value;
  this.password = this.groupForms.get('Password')?.value;

  alert("Dati inviati");
 }

}
