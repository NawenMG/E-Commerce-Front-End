import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class WishlistApiService {

  private apiUrlInsert = 'http://localhost:8080/api/key/wishlist/insert';
  private apiUrlUpdate = 'http://localhost:8080/api/key/wishlist/update';
  private apiUrlDelete = 'http://localhost:8080/api/key/wishlist/delete';

  constructor() { }

  //POST
  create(wish: any) {
    return axios.post(this.apiUrlInsert, wish).then(response => response.data);
  }

  //PUT
  update(wish:any) {
    return axios.put(this.apiUrlUpdate, wish).then(response => response.data);
  }

  //DELETE
  delete(id: number) {
    return axios.delete(`${this.apiUrlDelete}/${id}`).then(response => response.data);
  }
}
