import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApolloService } from '../../graphqlapolloService.service'; // Assicurati di avere questo servizio implementato
import gql from 'graphql-tag';
import { ApolloQueryResult } from '@apollo/client/core';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-server-response',
  templateUrl: './server-response-graphql.component.html',
  styleUrls: ['./server-response-graphql.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class ServerResponseComponent implements OnInit {
  @Output() responsesFetched = new EventEmitter<any[]>();

  serverResponseForm: FormGroup;
  items: any[] = [];
  totalCount: number = 0;
  loading: boolean = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private apolloService: ApolloService) {
    this.serverResponseForm = this.fb.group({
      server: [null],
      endpoint: [null],
      responseTimeAverage: [null],
      requestNumbers: [null],
      errorsNumbers: [null],
      timeStamp: [null],
      measurement: [null],
      timeRangeStart: [null],
      timeRangeEnd: [null],
      limit: [10],
      offset: [0],
    });
  }

  ngOnInit() {
    // Chiamata iniziale per fetchare i dati delle risposte del server (opzionale)
    this.fetchServerResponses();
  }

  fetchServerResponses() {
    const GET_SERVER_RESPONSES = gql`
      query GetServerResponses($params: ParamQueryInput, $filter: ServerResponseFilter) {
        getServerResponses(params: $params, filter: $filter) {
          items {
            server
            endpoint
            responseTimeAverage
            requestNumbers
            errorsNumbers
            timeStamp
          }
          totalCount
        }
      }
    `;

    const params = {
      measurement: this.serverResponseForm.value.measurement,
      timeRangeStart: this.serverResponseForm.value.timeRangeStart,
      timeRangeEnd: this.serverResponseForm.value.timeRangeEnd,
      limit: this.serverResponseForm.value.limit,
      offset: this.serverResponseForm.value.offset,
    };

    const filter = {
      server: this.serverResponseForm.value.server,
      endpoint: this.serverResponseForm.value.endpoint,
      responseTimeAverage: this.serverResponseForm.value.responseTimeAverage,
      requestNumbers: this.serverResponseForm.value.requestNumbers,
      errorsNumbers: this.serverResponseForm.value.errorsNumbers,
      timeStamp: this.serverResponseForm.value.timeStamp,
    };

    this.loading = true;
    this.error = null;

    this.apolloService.getApolloClient()
      .query<{ getServerResponses: { items: any[]; totalCount: number } }>({
        query: GET_SERVER_RESPONSES,
        variables: { params, filter },
      })
      .pipe(
        map((result: ApolloQueryResult<any>) => {
          return result.data.getServerResponses;
        })
      )
      .subscribe({
        next: (data) => {
          this.items = data.items;
          this.totalCount = data.totalCount;
          this.loading = false;

          this.responsesFetched.emit(this.items);
        },
        error: (err) => {
          console.error('Error fetching server responses:', err);
          this.error = 'An error occurred while fetching server response data.';
          this.loading = false;
        },
      });
  }
}
