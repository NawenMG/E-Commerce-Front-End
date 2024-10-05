import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApolloService } from '../../graphqlapolloService.service'; // Assicurati di avere questo servizio implementato
import gql from 'graphql-tag';
import { ApolloQueryResult } from '@apollo/client/core';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-spedizione',
  templateUrl: './sistema-spedizione-graphql.component.html',
  styleUrls: ['./sistema-spedizione-graphql.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class SpedizioneComponent implements OnInit {
  @Output() spedizioniFetched = new EventEmitter<any[]>();

  spedizioneForm: FormGroup;
  items: any[] = [];
  totalCount: number = 0;
  loading: boolean = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private apolloService: ApolloService) {
    this.spedizioneForm = this.fb.group({
      spedizioneID: [null],
      aziendaInCaricoPerLaSpedizione: [null],
      consegna: [null],
      dataDiConsegnaPrevista: [null],
      locazioneCorrente: [null],
      limit: [10],
      offset: [0],
    });
  }

  ngOnInit() {
    // Chiamata iniziale per fetchare le spedizioni (opzionale)
    this.fetchSpedizioni();
  }

  fetchSpedizioni() {
    const GET_SPEDIZIONI = gql`
      query GetSistemaSpedizione($params: ParamQueryInput, $filter: SpedizioneFilter) {
        getSistemaSpedizione(params: $params, filter: $filter) {
          items {
            spedizioneID
            aziendaInCaricoPerLaSpedizione
            consegna
            dataDiConsegnaPrevista
            ritardo
            locazioneCorrente
            storicoLocazioni
            timeStamp
            utenti {
              userID
              nome
              cognome
              email
              indirizzo
              phoneNumber
            }
          }
          totalCount
        }
      }
    `;

    const params = {
      limit: this.spedizioneForm.value.limit,
      offset: this.spedizioneForm.value.offset,
    };

    const filter = {
      spedizioneID: this.spedizioneForm.value.spedizioneID,
      aziendaInCaricoPerLaSpedizione: this.spedizioneForm.value.aziendaInCaricoPerLaSpedizione,
      consegna: this.spedizioneForm.value.consegna,
      dataDiConsegnaPrevista: this.spedizioneForm.value.dataDiConsegnaPrevista,
      locazioneCorrente: this.spedizioneForm.value.locazioneCorrente,
    };

    this.loading = true;
    this.error = null;

    this.apolloService.getApolloClient()
      .query<{ getSistemaSpedizione: { items: any[]; totalCount: number } }>({
        query: GET_SPEDIZIONI,
        variables: { params, filter },
      })
      .pipe(
        map((result: ApolloQueryResult<any>) => {
          return result.data.getSistemaSpedizione;
        })
      )
      .subscribe({
        next: (data) => {
          this.items = data.items;
          this.totalCount = data.totalCount;
          this.loading = false;

          this.spedizioniFetched.emit(this.items);
        },
        error: (err) => {
          console.error('Error fetching shipments:', err);
          this.error = 'An error occurred while fetching shipments.';
          this.loading = false;
        },
      });
  }
}
