import { Injectable } from '@angular/core';
import * as soap from 'soap';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private wsdlUrl = 'http://localhost:8080/ws/payments';
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

  public async getPayments(paramQuery: any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.client.getPayments({ paramQuery }, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.payments);
        }
      });
    });
  }

  public async insertPayment(payment: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.insertPayment({ payment }, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  public async updatePayment(payment: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.updatePayment({ payment }, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  public async deletePayment(paymentId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.deletePayment({ paymentId }, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}
