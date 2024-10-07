import { Injectable } from '@angular/core';
import * as soap from 'soap';

@Injectable({
  providedIn: 'root'
})
export class SoapTransizioniService {
  private wsdlUrl = 'http://localhost:8080/ws/archiviazioneTransizioni';
  private client: any;

  constructor() {
    this.initializeSoapClient();
  }

  private async initializeSoapClient() {
    try {
      this.client = await soap.createClientAsync(this.wsdlUrl);
    } catch (error) {
      console.error('Error creating SOAP client', error);
    }
  }

  public async getTransizioni(paramQuery: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.getTransizioni({ paramQuery }, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  public async insertTransizione(transizione: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.insertTransizione({ transizione }, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  public async updateTransizione(transizione: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.updateTransizione({ transizione }, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  public async deleteTransizione(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.deleteTransizione({ id }, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}
