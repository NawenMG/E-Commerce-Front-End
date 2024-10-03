import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CategoriesApiService {

  private apiUrlInsert = 'http://localhost:8080/api/jdbc/categories/insert';
  private apiUrlUpdate = 'http://localhost:8080/api/jdbc/categories/update';
  private apiUrlDelete = 'http://localhost:8080/api/jdbc/categories/delete';

  constructor() { }

  //POST
  create(category: any) {
    return axios.post(this.apiUrlInsert, category).then(response => response.data);
  }

  //PUT
  update(category:any) {
    return axios.put(this.apiUrlUpdate, category).then(response => response.data);
  }

  //DELETE
  delete(id: number) {
    return axios.delete(`${this.apiUrlDelete}/${id}`).then(response => response.data);
  }
}
