import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CarrelloApiService {

  private apiUrlInsertImg = 'http://localhost:8080/api/s3/dbKey/carrello/insert';



  constructor() { }

  //POST
  createImg(immagine: any) {
    return axios.post(this.apiUrlInsertImg, immagine).then(response => response.data);
  }
}
