import { Injectable } from '@angular/core';
import * as soap from 'soap';

@Injectable({
  providedIn: 'root'
})
export class NodeUserLocationService {
  private wsdlUrl = 'http://localhost:8080/ws/nodeUserLocationService';
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

  public async getLocations(paramQuery: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.getLocations({ paramQuery }, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  public async insertLocation(location: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.insertLocation({ location }, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  public async updateLocation(location: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.updateLocation({ location }, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  public async deleteLocation(userId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.deleteLocation({ userId }, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}
