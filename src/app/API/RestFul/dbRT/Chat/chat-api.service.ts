import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ChatApiService {

  private apiUrlInsert = 'http://localhost:8080/api/rt/chats/insert';
  private apiUrlUpdate = 'http://localhost:8080/api/rt/chats/update';
  private apiUrlDelete = 'http://localhost:8080/api/rt/chats/delete';

  constructor() { }

  //POST
  create(mex: any) {
    return axios.post(this.apiUrlInsert, mex).then(response => response.data);
  }

  //PUT
  update(mex:any) {
    return axios.put(this.apiUrlUpdate, mex).then(response => response.data);
  }

  //DELETE
  delete(id: number) {
    return axios.delete(`${this.apiUrlDelete}/${id}`).then(response => response.data);
  }
}
