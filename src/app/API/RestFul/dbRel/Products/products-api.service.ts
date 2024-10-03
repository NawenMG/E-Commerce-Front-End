import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {

  private apiUrlInsert = 'http://localhost:8080/api/jdbc/products/insert';
  private apiUrlUpdate = 'http://localhost:8080/api/jdbc/products/update';
  private apiUrlDelete = 'http://localhost:8080/api/jdbc/products/delete';

  constructor() { }

  //POST
  create(product: any) {
    return axios.post(this.apiUrlInsert, product).then(response => response.data);
  }

  //PUT
  update(product:any) {
    return axios.put(this.apiUrlUpdate, product).then(response => response.data);
  }

  //DELETE
  delete(id: number) {
    return axios.delete(`${this.apiUrlDelete}/${id}`).then(response => response.data);
  }
}
