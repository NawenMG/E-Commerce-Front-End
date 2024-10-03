import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AnalysisuserApiService {

  private apiUrlInsert = 'http://localhost:8080/api/ts/analysis-user/insert';
  private apiUrlUpdate = 'http://localhost:8080/api/ts/analysis-user/update';
  private apiUrlDelete = 'http://localhost:8080/api/ts/analysis-user/delete';

  constructor() { }

  //POST
  create(analisi: any) {
    return axios.post(this.apiUrlInsert, analisi).then(response => response.data);
  }

  //PUT
  update(analisi:any) {
    return axios.put(this.apiUrlUpdate, analisi).then(response => response.data);
  }

  //DELETE
  delete(id: number) {
    return axios.delete(`${this.apiUrlDelete}/${id}`).then(response => response.data);
  }
}

