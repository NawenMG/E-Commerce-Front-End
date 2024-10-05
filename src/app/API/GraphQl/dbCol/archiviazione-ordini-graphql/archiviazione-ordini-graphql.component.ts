import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { ApolloService } from '../../graphqlapolloService.service'; // Assicurati di importare il tuo servizio Apollo
import gql from 'graphql-tag';
import { ApolloQueryResult } from '@apollo/client/core';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';

@Component({
  standalone: true, // Questo indica che il componente è standalone
  selector: 'app-order-list',
  templateUrl: './archiviazione-ordini-graphql.component.html',
  styleUrls: ['./archiviazione-ordini-graphql.component.css'],
  imports: [ReactiveFormsModule, CommonModule] // Aggiungi ReactiveFormsModule qui
})
export class OrderListComponent implements OnInit {
  @Output() ordersFetched = new EventEmitter<any[]>(); // Output per emettere i dati degli ordini

  orderForm: FormGroup; // FormGroup per gestire gli input
  orders: any[] = [];
  totalCount: number = 0;
  averageImport: number = 0;
  sumImport: number = 0;
  loading: boolean = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private apolloService: ApolloService) {
    // Inizializza il form con i controlli necessari
    this.orderForm = this.fb.group({
      distinct: [false],
      limit: [10],
      offset: [0],
      userID: [null],
      status: [null],
      orderDateFrom: [null],
      orderDateTo: [null],
      totalImportMin: [null],
      totalImportMax: [null],
    });
  }

  ngOnInit() {
    // Chiamata al metodo per fetchare gli ordini (opzionale all'avvio)
    this.fetchOrders();
  }

  // Metodo per interrogare i dati
  fetchOrders() {
    const GET_ORDINI = gql`
      query GetOrdini($params: ParamQueryInput, $filter: ArchiviazioneOrdiniFilter) {
        getOrdini(params: $params, filter: $filter) {
          ordini {
            id
            userID
            orderDate
            status
            totalImport
            indirizzo
            articoliOrdine
            dataConsegna
            corriere
          }
          totalCount
          averageImport
          sumImport
        }
      }
    `;

    // Ottieni i valori dal form
    const params = {
      distinct: this.orderForm.value.distinct,
      limit: this.orderForm.value.limit,
      offset: this.orderForm.value.offset,
    };

    const filter = {
      userID: this.orderForm.value.userID,
      status: this.orderForm.value.status,
      orderDateFrom: this.orderForm.value.orderDateFrom,
      orderDateTo: this.orderForm.value.orderDateTo,
      totalImportMin: this.orderForm.value.totalImportMin,
      totalImportMax: this.orderForm.value.totalImportMax,
    };

    this.loading = true; // Imposta lo stato di caricamento
    this.error = null; // Resetta l'errore

    this.apolloService.getApolloClient()
      .query<{ getOrdini: { ordini: any[]; totalCount: number; averageImport: number; sumImport: number } }>({
        query: GET_ORDINI,
        variables: { params, filter },
      })
      .pipe(
        map((result: ApolloQueryResult<any>) => {
          return result.data.getOrdini;
        })
      )
      .subscribe({
        next: (data) => {
          this.orders = data.ordini;
          this.totalCount = data.totalCount;
          this.averageImport = data.averageImport;
          this.sumImport = data.sumImport;
          this.loading = false; // Reset dello stato di caricamento

          this.ordersFetched.emit(this.orders);

        },
        error: (err) => {
          console.error('Error fetching orders:', err);
          this.error = 'An error occurred while fetching orders.';
          this.loading = false; // Reset dello stato di caricamento
        },
      });
  }
}
