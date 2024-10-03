import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ReturnsApiService {

  private apiUrlInsert = 'http://localhost:8080/api/jdbc/returns/insert';
  private apiUrlUpdate = 'http://localhost:8080/api/jdbc/returns/update';
  private apiUrlDelete = 'http://localhost:8080/api/jdbc/returns/delete';

  constructor() { }

  //POST
  create(returns: any) {
    return axios.post(this.apiUrlInsert, returns).then(response => response.data);
  }

  //PUT
  update(returns:any) {
    return axios.put(this.apiUrlUpdate, returns).then(response => response.data);
  }

  //DELETE
  delete(id: number) {
    return axios.delete(`${this.apiUrlDelete}/${id}`).then(response => response.data);
  }
}
