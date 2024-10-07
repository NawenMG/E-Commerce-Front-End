import { Injectable } from '@angular/core';
import * as soap from 'soap';

@Injectable({
  providedIn: 'root'
})
export class SoapService {
  private wsdlUrl = 'http://localhost:8080/ws/archiviazioneSegnalazioni';
  private client: any;

  constructor() {
    this.initializeSoapClient();
  }

  private async initializeSoapClient() { //Inizializzazione soap
    try {
      this.client = await soap.createClientAsync(this.wsdlUrl);
    } catch (error) {
      console.error('Error creating SOAP client', error);
    }
  }

  //Soliti 4 metodi
  public async getSegnalazioni(paramQuery: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.getSegnalazioni({ paramQuery }, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  public async insertSegnalazione(segnalazione: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.insertSegnalazione({ segnalazione }, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  public async updateSegnalazione(segnalazione: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.updateSegnalazione({ segnalazione }, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  public async deleteSegnalazione(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.deleteSegnalazione({ id }, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}
