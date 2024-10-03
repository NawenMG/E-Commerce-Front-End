import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CarrelloApiService {

  private apiUrlInsert = 'http://localhost:8080/api/key/carrello/insert';
  private apiUrlUpdate = 'http://localhost:8080/api/key/carrello/update';
  private apiUrlDelete = 'http://localhost:8080/api/key/carrello/delete';

  constructor() { }

  //POST
  create(carrello: any) {
    return axios.post(this.apiUrlInsert, carrello).then(response => response.data);
  }

  //PUT
  update(carrello:any) {
    return axios.put(this.apiUrlUpdate, carrello).then(response => response.data);
  }

  //DELETE
  delete(id: number) {
    return axios.delete(`${this.apiUrlDelete}/${id}`).then(response => response.data);
  }
}
