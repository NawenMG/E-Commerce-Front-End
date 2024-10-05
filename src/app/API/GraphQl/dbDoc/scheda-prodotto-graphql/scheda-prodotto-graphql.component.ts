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
  selector: 'app-scheda-prodotto',
  templateUrl: './scheda-prodotto-graphql.component.html',
  styleUrls: ['./scheda-prodotto-graphql.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class SchedaProdottoComponent implements OnInit {
  @Output() schedaProdottoFetched = new EventEmitter<any[]>();

  schedaProdottoForm: FormGroup;
  schedaProdotto: any[] = [];
  totalCount: number = 0;
  loading: boolean = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private apolloService: ApolloService) {
    this.schedaProdottoForm = this.fb.group({
      idSchedaProdotto: [null],
      nome: [null],
      prezzo: [null],
      limit: [10],
      offset: [0],
    });
  }

  ngOnInit() {
    // Chiamata iniziale per fetchare le schede prodotto (opzionale)
    this.fetchSchedaProdotto();
  }

  fetchSchedaProdotto() {
    const GET_SCHEDA_PRODOTTO = gql`
      query GetSchedaProdotto($params: ParamQueryInput, $filter: SchedaProdottoFilter) {
        getSchedaProdotto(params: $params, filter: $filter) {
          schedaProdotto {
            idSchedaProdotto
            nome
            prezzo
            campiAggiuntivi
          }
          totalCount
        }
      }
    `;

    const params = {
      limit: this.schedaProdottoForm.value.limit,
      offset: this.schedaProdottoForm.value.offset,
    };

    const filter = {
      idSchedaProdotto: this.schedaProdottoForm.value.idSchedaProdotto,
      nome: this.schedaProdottoForm.value.nome,
      prezzo: this.schedaProdottoForm.value.prezzo,
    };

    this.loading = true;
    this.error = null;

    this.apolloService.getApolloClient()
      .query<{ getSchedaProdotto: { schedaProdotto: any[]; totalCount: number } }>({
        query: GET_SCHEDA_PRODOTTO,
        variables: { params, filter },
      })
      .pipe(
        map((result: ApolloQueryResult<any>) => {
          return result.data.getSchedaProdotto;
        })
      )
      .subscribe({
        next: (data) => {
          this.schedaProdotto = data.schedaProdotto;
          this.totalCount = data.totalCount;
          this.loading = false;

          this.schedaProdottoFetched.emit(this.schedaProdotto);
        },
        error: (err) => {
          console.error('Error fetching scheda prodotto:', err);
          this.error = 'An error occurred while fetching scheda prodotto.';
          this.loading = false;
        },
      });
  }
}
