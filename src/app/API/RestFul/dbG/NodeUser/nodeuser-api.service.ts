import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class NodeuserApiService {

  private apiUrlInsert = 'http://localhost:8080/api/g/users/insert';
  private apiUrlUpdate = 'http://localhost:8080/api/g/users/update';
  private apiUrlDelete = 'http://localhost:8080/api/g/users/delete';

  constructor() { }

  //POST
  create(user: any) {
    return axios.post(this.apiUrlInsert, user).then(response => response.data);
  }

  //PUT
  update(user:any) {
    return axios.put(this.apiUrlUpdate, user).then(response => response.data);
  }

  //DELETE
  delete(id: number) {
    return axios.delete(`${this.apiUrlDelete}/${id}`).then(response => response.data);
  }
}
