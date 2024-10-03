import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class RecensioniApiService {

  private apiUrlInsert = 'http://localhost:8080/api/doc/recensioni/insert';
  private apiUrlUpdate = 'http://localhost:8080/api/doc/recensioni/update';
  private apiUrlDelete = 'http://localhost:8080/api/doc/recensioni/delete';

  constructor() { }

  //POST
  create(recensione: any) {
    return axios.post(this.apiUrlInsert, recensione).then(response => response.data);
  }

  //PUT
  update(recensione:any) {
    return axios.put(this.apiUrlUpdate, recensione).then(response => response.data);
  }

  //DELETE
  delete(id: number) {
    return axios.delete(`${this.apiUrlDelete}/${id}`).then(response => response.data);
  }
}
