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
  selector: 'app-payments',
  templateUrl: './payments-graphql.component.html',
  styleUrls: ['./payments-graphql.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class PaymentsComponent implements OnInit {
  @Output() paymentsFetched = new EventEmitter<any[]>();

  paymentsForm: FormGroup;
  items: any[] = [];
  totalCount: number = 0;
  loading: boolean = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private apolloService: ApolloService) {
    this.paymentsForm = this.fb.group({
      paymentsID: [null],
      type: [null],
      data: [null],
      status: [null],
      total: [null],
      limit: [10],
      offset: [0],
    });
  }

  ngOnInit() {
    // Chiamata iniziale per fetchare i pagamenti (opzionale)
    this.fetchPayments();
  }

  fetchPayments() {
    const GET_PAYMENTS = gql`
      query GetPayments($params: ParamQueryInput, $filter: PaymentsFilter) {
        getPayments(params: $params, filter: $filter) {
          items {
            paymentsID
            type
            data
            status
            total
          }
          totalCount
        }
      }
    `;

    const params = {
      limit: this.paymentsForm.value.limit,
      offset: this.paymentsForm.value.offset,
    };

    const filter = {
      paymentsID: this.paymentsForm.value.paymentsID,
      type: this.paymentsForm.value.type,
      data: this.paymentsForm.value.data,
      status: this.paymentsForm.value.status,
      total: this.paymentsForm.value.total,
    };

    this.loading = true;
    this.error = null;

    this.apolloService.getApolloClient()
      .query<{ getPayments: { items: any[]; totalCount: number } }>({
        query: GET_PAYMENTS,
        variables: { params, filter },
      })
      .pipe(
        map((result: ApolloQueryResult<any>) => {
          return result.data.getPayments;
        })
      )
      .subscribe({
        next: (data) => {
          this.items = data.items;
          this.totalCount = data.totalCount;
          this.loading = false;

          this.paymentsFetched.emit(this.items);
        },
        error: (err) => {
          console.error('Error fetching payments:', err);
          this.error = 'An error occurred while fetching payments.';
          this.loading = false;
        },
      });
  }
}
