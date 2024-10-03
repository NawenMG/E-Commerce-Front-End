import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SalesmonitoringService {
  private apiUrlInsert = 'http://localhost:8080/api/ts/sales-monitoring/insert';
  private apiUrlUpdate = 'http://localhost:8080/api/ts/sales-monitoring/update';
  private apiUrlDelete = 'http://localhost:8080/api/ts/sales-monitoring/delete';

  constructor() { }

  //POST
  create(sale: any) {
    return axios.post(this.apiUrlInsert, sale).then(response => response.data);
  }

  //PUT
  update(sale:any) {
    return axios.put(this.apiUrlUpdate, sale).then(response => response.data);
  }

  //DELETE
  delete(id: number) {
    return axios.delete(`${this.apiUrlDelete}/${id}`).then(response => response.data);
  }
}
