import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class OrdiniAPIService {

  private apiUrlInsert = 'http://localhost:8080/api/col/ordini/insert';
  private apiUrlUpdate = 'http://localhost:8080/api/col/ordini/update';
  private apiUrlDelete = 'http://localhost:8080/api/col/ordini/insert';



  constructor() { }

  //POST
  createUser(ordine: any) {
    return axios.post(this.apiUrlInsert, ordine).then(response => response.data);
  }

  //PUT
  updateUser(ordine:any) {
    return axios.put(this.apiUrlUpdate, ordine).then(response => response.data);
  }

  //DELETE
  deleteUser(id: number) {
    return axios.delete(`${this.apiUrlDelete}/${id}`).then(response => response.data);
  }

}
