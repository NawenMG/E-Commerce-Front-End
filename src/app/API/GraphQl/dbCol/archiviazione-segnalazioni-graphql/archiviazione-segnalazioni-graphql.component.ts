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
  selector: 'app-segnalazioni',
  templateUrl: './archiviazione-segnalazioni-graphql.component.html',
  styleUrls: ['./archiviazione-segnalazioni-graphql.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class SegnalazioniComponent implements OnInit {
  @Output() segnalazioniFetched = new EventEmitter<any[]>();

  segnalazioniForm: FormGroup;
  segnalazioni: any[] = [];
  totalCount: number = 0;
  loading: boolean = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private apolloService: ApolloService) {
    this.segnalazioniForm = this.fb.group({
      id: [null],
      utente: [null],
      riferimento: [null],
      dataFrom: [null],
      dataTo: [null],
      title: [null],
      limit: [10],
      offset: [0],
    });
  }

  ngOnInit() {
    // Chiamata iniziale per fetchare le segnalazioni (opzionale)
    this.fetchSegnalazioni();
  }

  fetchSegnalazioni() {
    const GET_SEGNALAZIONI = gql`
      query GetSegnalazioni($params: ParamQueryInput, $filter: ArchiviazioneSegnalazioniFilter) {
        getSegnalazioni(params: $params, filter: $filter) {
          segnalazioni {
            id
            utente
            riferimento
            data
            title
            body
            immagini
            audio
            video
          }
          totalCount
        }
      }
    `;

    const params = {
      limit: this.segnalazioniForm.value.limit,
      offset: this.segnalazioniForm.value.offset,
    };

    const filter = {
      id: this.segnalazioniForm.value.id,
      utente: this.segnalazioniForm.value.utente,
      riferimento: this.segnalazioniForm.value.riferimento,
      dataFrom: this.segnalazioniForm.value.dataFrom,
      dataTo: this.segnalazioniForm.value.dataTo,
      title: this.segnalazioniForm.value.title,
    };

    this.loading = true;
    this.error = null;

    this.apolloService.getApolloClient()
      .query<{ getSegnalazioni: { segnalazioni: any[]; totalCount: number } }>({
        query: GET_SEGNALAZIONI,
        variables: { params, filter },
      })
      .pipe(
        map((result: ApolloQueryResult<any>) => {
          return result.data.getSegnalazioni;
        })
      )
      .subscribe({
        next: (data) => {
          this.segnalazioni = data.segnalazioni;
          this.totalCount = data.totalCount;
          this.loading = false;

          this.segnalazioniFetched.emit(this.segnalazioni);
        },
        error: (err) => {
          console.error('Error fetching segnalazioni:', err);
          this.error = 'An error occurred while fetching segnalazioni.';
          this.loading = false;
        },
      });
  }
}
