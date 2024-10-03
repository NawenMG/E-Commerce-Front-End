import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SistemaspedizioneApiService {

  private apiUrlInsert = 'http://localhost:8080/api/rt/spedizioni/insert';
  private apiUrlUpdate = 'http://localhost:8080/api/rt/spedizioni/update';
  private apiUrlDelete = 'http://localhost:8080/api/rt/spedizioni/delete';

  constructor() { }

  //POST
  create(spedizione: any) {
    return axios.post(this.apiUrlInsert, spedizione).then(response => response.data);
  }

  //PUT
  update(spedizione:any) {
    return axios.put(this.apiUrlUpdate, spedizione).then(response => response.data);
  }

  //DELETE
  delete(id: number) {
    return axios.delete(`${this.apiUrlDelete}/${id}`).then(response => response.data);
  }
}
