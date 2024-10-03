import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SettingsApiService {

  private apiUrlInsert = 'http://localhost:8080/api/key/settings/insert';
  private apiUrlUpdate = 'http://localhost:8080/api/key/settings/update';
  private apiUrlDelete = 'http://localhost:8080/api/key/settings/delete';

  constructor() { }

  //POST
  create(setting: any) {
    return axios.post(this.apiUrlInsert, setting).then(response => response.data);
  }

  //PUT
  update(setting:any) {
    return axios.put(this.apiUrlUpdate, setting).then(response => response.data);
  }

  //DELETE
  delete(id: number) {
    return axios.delete(`${this.apiUrlDelete}/${id}`).then(response => response.data);
  }
}
