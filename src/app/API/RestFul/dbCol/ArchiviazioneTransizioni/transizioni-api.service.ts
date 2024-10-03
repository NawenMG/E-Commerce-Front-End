import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class TransizioniApiService {

  private apiUrlInsert = 'http://localhost:8080/api/col/transizioni/insert';
  private apiUrlUpdate = 'http://localhost:8080/api/col/transizioni/update';
  private apiUrlDelete = 'http://localhost:8080/api/col/transizioni/delete';

  constructor() { }

  //POST
  create(transizione: any) {
    return axios.post(this.apiUrlInsert, transizione).then(response => response.data);
  }

  //PUT
  update(transizione:any) {
    return axios.put(this.apiUrlUpdate, transizione).then(response => response.data);
  }

  //DELETE
  delete(id: number) {
    return axios.delete(`${this.apiUrlDelete}/${id}`).then(response => response.data);
  }
}
