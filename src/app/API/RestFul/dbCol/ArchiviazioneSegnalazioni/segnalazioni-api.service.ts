import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SegnalazioniApiService {

  private apiUrlInsert = 'http://localhost:8080/api/col/segnalazioni/insert';
  private apiUrlUpdate = 'http://localhost:8080/api/col/segnalazioni/update';
  private apiUrlDelete = 'http://localhost:8080/api/col/segnalazioni/delete';

  constructor() { }

  //POST
  createUser(segnalazione: any) {
    return axios.post(this.apiUrlInsert, segnalazione).then(response => response.data);
  }

  //PUT
  updateUser(segnalazione:any) {
    return axios.put(this.apiUrlUpdate, segnalazione).then(response => response.data);
  }

  //DELETE
  deleteUser(id: number) {
    return axios.delete(`${this.apiUrlDelete}/${id}`).then(response => response.data);
  }



}
