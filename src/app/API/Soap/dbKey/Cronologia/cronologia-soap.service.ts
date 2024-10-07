import { Injectable } from '@angular/core';
import * as soap from 'soap';

@Injectable({
  providedIn: 'root'
})
export class CronologiaService {
  private wsdlUrl = 'http://localhost:8080/ws/cronologiaService';
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

  public async getCronologie(paramQuery: any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.client.getCronologie({ paramQuery }, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.cronologie);
        }
      });
    });
  }

  public async insertCronologia(cronologia: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.insertCronologia({ cronologia }, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  public async updateCronologia(cronologia: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.updateCronologia({ cronologia }, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  public async deleteCronologia(userID: number, productID: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.deleteCronologia({ userID, productID }, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}
