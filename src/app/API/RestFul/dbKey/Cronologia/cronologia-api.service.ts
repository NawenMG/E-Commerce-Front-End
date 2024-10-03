import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CronologiaApiService {

  private apiUrlInsert = 'http://localhost:8080/api/key/cronologia/insert';
  private apiUrlUpdate = 'http://localhost:8080/api/key/cronologia/update';
  private apiUrlDelete = 'http://localhost:8080/api/key/cronologia/delete';

  constructor() { }

  //POST
  create(cronologia: any) {
    return axios.post(this.apiUrlInsert, cronologia).then(response => response.data);
  }

  //PUT
  update(cronologia:any) {
    return axios.put(this.apiUrlUpdate, cronologia).then(response => response.data);
  }

  //DELETE
  delete(id: number) {
    return axios.delete(`${this.apiUrlDelete}/${id}`).then(response => response.data);
  }
}
