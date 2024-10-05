import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApolloService } from '../../graphqlapolloService.service'; // Assicurati di avere questo servizio implementato
import gql from 'graphql-tag';
import { ApolloQueryResult } from '@apollo/client/core';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-sales-monitoring',
  templateUrl: './sales-monitoring-graphql.component.html',
  styleUrls: ['./sales-monitoring-graphql.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class SalesMonitoringComponent implements OnInit {
  @Output() salesFetched = new EventEmitter<any[]>();

  salesForm: FormGroup;
  items: any[] = [];
  totalCount: number = 0;
  loading: boolean = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private apolloService: ApolloService) {
    this.salesForm = this.fb.group({
      product: [null],
      category: [null],
      venditore: [null],
      numeroOrdini: [null],
      numeroUnitàVendute: [null],
      ricavo: [null],
      timeStamp: [null],
      measurement: [null],
      timeRangeStart: [null],
      timeRangeEnd: [null],
      limit: [10],
      offset: [0],
    });
  }

  ngOnInit() {
    // Chiamata iniziale per fetchare i dati delle vendite (opzionale)
    this.fetchSalesMonitoring();
  }

  fetchSalesMonitoring() {
    const GET_SALES_MONITORING = gql`
      query GetSalesMonitoring($params: ParamQueryInput, $filter: SalesMonitoringFilter) {
        getSalesMonitoring(params: $params, filter: $filter) {
          items {
            product
            category
            venditore
            numeroOrdini
            numeroUnitàVendute
            ricavo
            timeStamp
          }
          totalCount
        }
      }
    `;

    const params = {
      measurement: this.salesForm.value.measurement,
      timeRangeStart: this.salesForm.value.timeRangeStart,
      timeRangeEnd: this.salesForm.value.timeRangeEnd,
      limit: this.salesForm.value.limit,
      offset: this.salesForm.value.offset,
    };

    const filter = {
      product: this.salesForm.value.product,
      category: this.salesForm.value.category,
      venditore: this.salesForm.value.venditore,
      numeroOrdini: this.salesForm.value.numeroOrdini,
      numeroUnitàVendute: this.salesForm.value.numeroUnitàVendute,
      ricavo: this.salesForm.value.ricavo,
      timeStamp: this.salesForm.value.timeStamp,
    };

    this.loading = true;
    this.error = null;

    this.apolloService.getApolloClient()
      .query<{ getSalesMonitoring: { items: any[]; totalCount: number } }>({
        query: GET_SALES_MONITORING,
        variables: { params, filter },
      })
      .pipe(
        map((result: ApolloQueryResult<any>) => {
          return result.data.getSalesMonitoring;
        })
      )
      .subscribe({
        next: (data) => {
          this.items = data.items;
          this.totalCount = data.totalCount;
          this.loading = false;

          this.salesFetched.emit(this.items);
        },
        error: (err) => {
          console.error('Error fetching sales monitoring:', err);
          this.error = 'An error occurred while fetching sales monitoring data.';
          this.loading = false;
        },
      });
  }
}
