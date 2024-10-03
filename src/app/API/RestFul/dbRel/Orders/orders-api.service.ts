import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class OrdersApiService {

  private apiUrlInsert = 'http://localhost:8080/api/jdbc/orders/insert';
  private apiUrlUpdate = 'http://localhost:8080/api/jdbc/orders/update';
  private apiUrlDelete = 'http://localhost:8080/api/jdbc/orders/delete';

  constructor() { }

  //POST
  create(order: any) {
    return axios.post(this.apiUrlInsert, order).then(response => response.data);
  }

  //PUT
  update(order:any) {
    return axios.put(this.apiUrlUpdate, order).then(response => response.data);
  }

  //DELETE
  delete(id: number) {
    return axios.delete(`${this.apiUrlDelete}/${id}`).then(response => response.data);
  }
}
