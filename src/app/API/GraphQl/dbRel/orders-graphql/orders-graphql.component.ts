import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApolloService } from '../../graphqlapolloService.service'; // Assicurati di avere questo servizio implementato
import gql from 'graphql-tag';
import { ApolloQueryResult } from '@apollo/client/core';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-orders',
  templateUrl: './orders-graphql.component.html',
  styleUrls: ['./orders-graphql.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class OrdersComponent implements OnInit {
  @Output() ordersFetched = new EventEmitter<any[]>();

  ordersForm: FormGroup;
  items: any[] = [];
  totalCount: number = 0;
  loading: boolean = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private apolloService: ApolloService) {
    this.ordersForm = this.fb.group({
      orderID: [null],
      usersID: [null],
      statoDiSpedizione: [null],
      dataDiConsegna: [null],
      dataDiRichiesta: [null],
      accettazioneOrdine: [null],
      status: [null],
      corriere: [null],
      posizione: [null],
      limit: [10],
      offset: [0],
    });
  }

  ngOnInit() {
    // Chiamata iniziale per fetchare gli ordini (opzionale)
    this.fetchOrders();
  }

  fetchOrders() {
    const GET_ORDERS = gql`
      query GetOrders($params: ParamQueryInput, $filter: OrdersFilter) {
        getOrders(params: $params, filter: $filter) {
          items {
            orderID
            usersID
            statoDiSpedizione
            dataDiConsegna
            dataDiRichiesta
            accettazioneOrdine
            status
            corriere
            posizione
          }
          totalCount
        }
      }
    `;

    const params = {
      limit: this.ordersForm.value.limit,
      offset: this.ordersForm.value.offset,
    };

    const filter = {
      orderID: this.ordersForm.value.orderID,
      usersID: this.ordersForm.value.usersID,
      statoDiSpedizione: this.ordersForm.value.statoDiSpedizione,
      dataDiConsegna: this.ordersForm.value.dataDiConsegna,
      dataDiRichiesta: this.ordersForm.value.dataDiRichiesta,
      accettazioneOrdine: this.ordersForm.value.accettazioneOrdine,
      status: this.ordersForm.value.status,
      corriere: this.ordersForm.value.corriere,
      posizione: this.ordersForm.value.posizione,
    };

    this.loading = true;
    this.error = null;

    this.apolloService.getApolloClient()
      .query<{ getOrders: { items: any[]; totalCount: number } }>({
        query: GET_ORDERS,
        variables: { params, filter },
      })
      .pipe(
        map((result: ApolloQueryResult<any>) => {
          return result.data.getOrders;
        })
      )
      .subscribe({
        next: (data) => {
          this.items = data.items;
          this.totalCount = data.totalCount;
          this.loading = false;

          this.ordersFetched.emit(this.items);
        },
        error: (err) => {
          console.error('Error fetching orders:', err);
          this.error = 'An error occurred while fetching orders.';
          this.loading = false;
        },
      });
  }
}
