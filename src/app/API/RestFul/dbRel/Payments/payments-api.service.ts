import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PaymentsApiService {

  private apiUrlInsert = 'http://localhost:8080/api/jdbc/payments/insert';
  private apiUrlUpdate = 'http://localhost:8080/api/jdbc/payments/update';
  private apiUrlDelete = 'http://localhost:8080/api/jdbc/payments/delete';

  constructor() { }

  //POST
  create(payment: any) {
    return axios.post(this.apiUrlInsert, payment).then(response => response.data);
  }

  //PUT
  update(payment:any) {
    return axios.put(this.apiUrlUpdate, payment).then(response => response.data);
  }

  //DELETE
  delete(id: number) {
    return axios.delete(`${this.apiUrlDelete}/${id}`).then(response => response.data);
  }


}
