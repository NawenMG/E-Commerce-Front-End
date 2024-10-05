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
  selector: 'app-recensioni',
  templateUrl: './recensioni-graphql.component.html',
  styleUrls: ['./recensioni-graphql.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class RecensioniComponent implements OnInit {
  @Output() recensioniFetched = new EventEmitter<any[]>();

  recensioniForm: FormGroup;
  recensioni: any[] = [];
  totalCount: number = 0;
  loading: boolean = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private apolloService: ApolloService) {
    this.recensioniForm = this.fb.group({
      idReview: [null],
      titolo: [null],
      rate: [null],
      verificadellAcquisto: [null],
      like: [null],
      dislike: [null],
      tags: [null],
      limit: [10],
      offset: [0],
    });
  }

  ngOnInit() {
    // Chiamata iniziale per fetchare le recensioni (opzionale)
    this.fetchRecensioni();
  }

  fetchRecensioni() {
    const GET_RECENSIONI = gql`
      query GetRecensioni($params: ParamQueryInput, $filter: RecensioniFilter) {
        getRecensioni(params: $params, filter: $filter) {
          recensioni {
            idReview
            titolo
            rate
            body
            verificadellAcquisto
            like
            dislike
            tags
            campiAggiuntivi
          }
          totalCount
        }
      }
    `;

    const params = {
      limit: this.recensioniForm.value.limit,
      offset: this.recensioniForm.value.offset,
    };

    const filter = {
      idReview: this.recensioniForm.value.idReview,
      titolo: this.recensioniForm.value.titolo,
      rate: this.recensioniForm.value.rate,
      verificadellAcquisto: this.recensioniForm.value.verificadellAcquisto,
      like: this.recensioniForm.value.like,
      dislike: this.recensioniForm.value.dislike,
      tags: this.recensioniForm.value.tags ? this.recensioniForm.value.tags.split(',') : [],
    };

    this.loading = true;
    this.error = null;

    this.apolloService.getApolloClient()
      .query<{ getRecensioni: { recensioni: any[]; totalCount: number } }>({
        query: GET_RECENSIONI,
        variables: { params, filter },
      })
      .pipe(
        map((result: ApolloQueryResult<any>) => {
          return result.data.getRecensioni;
        })
      )
      .subscribe({
        next: (data) => {
          this.recensioni = data.recensioni;
          this.totalCount = data.totalCount;
          this.loading = false;

          this.recensioniFetched.emit(this.recensioni);
        },
        error: (err) => {
          console.error('Error fetching recensioni:', err);
          this.error = 'An error occurred while fetching recensioni.';
          this.loading = false;
        },
      });
  }
}
