import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ArchiviazionesegnalazioniApiService {
  private apiUrlInsertImg = 'http://localhost:8080/api/s3/dbCol/archiviazionesegnalazioni/img/insert';
  private apiUrlInsertVideo = 'http://localhost:8080/api/s3/dbCol/archiviazionesegnalazioni/video/insert';
  private apiUrlInsertAudio = 'http://localhost:8080/api/s3/dbCol/archiviazionesegnalazioni/audio/insert';


  constructor() { }

  //POST
  createImg(immagine: any) {
    return axios.post(this.apiUrlInsertImg, immagine).then(response => response.data);
  }

  //POST
  createVideo(video: any) {
    return axios.post(this.apiUrlInsertVideo, video).then(response => response.data);
  }

  //POST
  createAudio(audio: any) {
    return axios.post(this.apiUrlInsertAudio, audio).then(response => response.data);
  }
}
