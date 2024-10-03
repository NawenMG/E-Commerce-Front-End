import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SchedaprodottoApiService {

  private apiUrlInsert = 'http://localhost:8080/api/doc/scheda-prodotto/insert';
  private apiUrlUpdate = 'http://localhost:8080/api/doc/scheda-prodotto/update';
  private apiUrlDelete = 'http://localhost:8080/api/doc/scheda-prodotto/delete';

  constructor() { }

  //POST
  create(schedaprodotto: any) {
    return axios.post(this.apiUrlInsert, schedaprodotto).then(response => response.data);
  }

  //PUT
  update(schedaprodotto:any) {
    return axios.put(this.apiUrlUpdate, schedaprodotto).then(response => response.data);
  }

  //DELETE
  delete(id: number) {
    return axios.delete(`${this.apiUrlDelete}/${id}`).then(response => response.data);
  }


}
