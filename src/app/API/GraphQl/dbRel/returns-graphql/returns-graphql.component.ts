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
  selector: 'app-returns',
  templateUrl: './returns-graphql.component.html',
  styleUrls: ['./returns-graphql.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class ReturnsComponent implements OnInit {
  @Output() returnsFetched = new EventEmitter<any[]>();

  returnsForm: FormGroup;
  items: any[] = [];
  totalCount: number = 0;
  loading: boolean = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private apolloService: ApolloService) {
    this.returnsForm = this.fb.group({
      returnsID: [null],
      usersID: [null],
      status: [null],
      accettazioneReso: [null],
      dataRichiesta: [null],
      limit: [10],
      offset: [0],
    });
  }

  ngOnInit() {
    // Chiamata iniziale per fetchare i resi (opzionale)
    this.fetchReturns();
  }

  fetchReturns() {
    const GET_RETURNS = gql`
      query GetReturns($params: ParamQueryInput, $filter: ReturnsFilter) {
        getReturns(params: $params, filter: $filter) {
          items {
            returnsID
            usersID
            status
            accettazioneReso
            dataRichiesta
          }
          totalCount
        }
      }
    `;

    const params = {
      limit: this.returnsForm.value.limit,
      offset: this.returnsForm.value.offset,
    };

    const filter = {
      returnsID: this.returnsForm.value.returnsID,
      usersID: this.returnsForm.value.usersID,
      status: this.returnsForm.value.status,
      accettazioneReso: this.returnsForm.value.accettazioneReso,
      dataRichiesta: this.returnsForm.value.dataRichiesta,
    };

    this.loading = true;
    this.error = null;

    this.apolloService.getApolloClient()
      .query<{ getReturns: { items: any[]; totalCount: number } }>({
        query: GET_RETURNS,
        variables: { params, filter },
      })
      .pipe(
        map((result: ApolloQueryResult<any>) => {
          return result.data.getReturns;
        })
      )
      .subscribe({
        next: (data) => {
          this.items = data.items;
          this.totalCount = data.totalCount;
          this.loading = false;

          this.returnsFetched.emit(this.items);
        },
        error: (err) => {
          console.error('Error fetching returns:', err);
          this.error = 'An error occurred while fetching returns.';
          this.loading = false;
        },
      });
  }
}
