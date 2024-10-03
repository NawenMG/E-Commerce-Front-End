import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SistemanotificheApiService {

  private apiUrlInsert = 'http://localhost:8080/api/rt/notifiche/insert';
  private apiUrlUpdate = 'http://localhost:8080/api/rt/notifiche/update';
  private apiUrlDelete = 'http://localhost:8080/api/rt/notifiche/delete';

  constructor() { }

  //POST
  create(notifica: any) {
    return axios.post(this.apiUrlInsert, notifica).then(response => response.data);
  }

  //PUT
  update(notifica:any) {
    return axios.put(this.apiUrlUpdate, notifica).then(response => response.data);
  }

  //DELETE
  delete(id: number) {
    return axios.delete(`${this.apiUrlDelete}/${id}`).then(response => response.data);
  }
}
