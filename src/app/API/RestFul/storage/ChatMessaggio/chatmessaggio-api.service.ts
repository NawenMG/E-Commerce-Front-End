import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ChatmessaggioApiService {

  private apiUrlInsertImg = 'http://localhost:8080/api/s3/dbRT/chat/messaggio/insert/immagine';

  constructor() { }

  //POST
  createImg(immagine: any) {
    return axios.post(this.apiUrlInsertImg, immagine).then(response => response.data);
  }
}
