import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SendemailApiService {
  private apiUrlEmail = 'http://localhost:8080/api/email/product';

  constructor() { }

  invioEmail(product:any, subject:any, to:any){
    return axios.post(this.apiUrlEmail, product, to).then(response => response.data);
  }
}
