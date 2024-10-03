import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ServerresponseApiService {
  private apiUrlInsert = 'http://localhost:8080/api/ts/server-response/insert';
  private apiUrlUpdate = 'http://localhost:8080/api/ts/server-response/update';
  private apiUrlDelete = 'http://localhost:8080/api/ts/server-response/delete';

  constructor() { }

  //POST
  create(server: any) {
    return axios.post(this.apiUrlInsert, server).then(response => response.data);
  }

  //PUT
  update(server:any) {
    return axios.put(this.apiUrlUpdate, server).then(response => response.data);
  }

  //DELETE
  delete(id: number) {
    return axios.delete(`${this.apiUrlDelete}/${id}`).then(response => response.data);
  }
}
