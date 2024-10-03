import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class NodeuserlocationApiService {

  private apiUrlInsert = 'http://localhost:8080/api/g/user-locations/insert';
  private apiUrlUpdate = 'http://localhost:8080/api/g/user-locations/update';
  private apiUrlDelete = 'http://localhost:8080/api/g/user-locations/delete';

  constructor() { }

   //POST
   create(location: any) {
    return axios.post(this.apiUrlInsert, location).then(response => response.data);
  }

  //PUT
  update(location:any) {
    return axios.put(this.apiUrlUpdate, location).then(response => response.data);
  }

  //DELETE
  delete(id: number) {
    return axios.delete(`${this.apiUrlDelete}/${id}`).then(response => response.data);
  }
}
