import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApolloService } from '../../graphqlapolloService.service';
import gql from 'graphql-tag';
import { ApolloQueryResult } from '@apollo/client/core';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-transizioni',
  templateUrl: './archiviazione-transizioni-graphql.component.html',
  styleUrls: ['./archiviazione-transizioni-graphql.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class TransizioniComponent implements OnInit {
  @Output() transizioniFetched = new EventEmitter<any[]>();

  transizioniForm: FormGroup;
  transizioni: any[] = [];
  totalCount: number = 0;
  averageImport: number = 0;
  sumImport: number = 0;
  loading: boolean = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private apolloService: ApolloService) {
    this.transizioniForm = this.fb.group({
      id: [null],
      orderID: [null],
      totalImportMin: [null],
      totalImportMax: [null],
      dataFrom: [null],
      dataTo: [null],
      metodoDiPagamento: [null],
      status: [null],
      limit: [10],
      offset: [0],
    });
  }

  ngOnInit() {
    // Chiamata iniziale per fetchare le transizioni (opzionale)
    this.fetchTransizioni();
  }

  fetchTransizioni() {
    const GET_TRANSIZIONI = gql`
      query GetTransizioni($params: ParamQueryInput, $filter: ArchiviazioneTransizioniFilter) {
        getTransizioni(params: $params, filter: $filter) {
          transizioni {
            id
            orderID
            totalImport
            data
            metodoDiPagamento
            status
          }
          totalCount
          averageImport
          sumImport
        }
      }
    `;

    const params = {
      limit: this.transizioniForm.value.limit,
      offset: this.transizioniForm.value.offset,
    };

    const filter = {
      id: this.transizioniForm.value.id,
      orderID: this.transizioniForm.value.orderID,
      totalImportMin: this.transizioniForm.value.totalImportMin,
      totalImportMax: this.transizioniForm.value.totalImportMax,
      dataFrom: this.transizioniForm.value.dataFrom,
      dataTo: this.transizioniForm.value.dataTo,
      metodoDiPagamento: this.transizioniForm.value.metodoDiPagamento,
      status: this.transizioniForm.value.status,
    };

    this.loading = true;
    this.error = null;

    this.apolloService.getApolloClient()
      .query<{ getTransizioni: { transizioni: any[]; totalCount: number; averageImport: number; sumImport: number } }>({
        query: GET_TRANSIZIONI,
        variables: { params, filter },
      })
      .pipe(
        map((result: ApolloQueryResult<any>) => {
          return result.data.getTransizioni;
        })
      )
      .subscribe({
        next: (data) => {
          this.transizioni = data.transizioni;
          this.totalCount = data.totalCount;
          this.averageImport = data.averageImport;
          this.sumImport = data.sumImport;
          this.loading = false;

          this.transizioniFetched.emit(this.transizioni);
        },
        error: (err) => {
          console.error('Error fetching transizioni:', err);
          this.error = 'An error occurred while fetching transizioni.';
          this.loading = false;
        },
      });
  }
}
