import { Injectable } from '@angular/core';
import * as soap from 'soap';

@Injectable({
  providedIn: 'root'
})
export class NodeUserService {
  private wsdlUrl = 'http://localhost:8080/ws/nodeUserService';
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

  public async getUsers(paramQuery: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.getUsers({ paramQuery }, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  public async insertUser(user: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.insertUser({ user }, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  public async updateUser(user: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.updateUser({ user }, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  public async deleteUser(userId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.deleteUser({ userId }, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}
