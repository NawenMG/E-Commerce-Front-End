import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApolloService } from '../../graphqlapolloService.service'; // Assicurati di avere questo servizio implementato
import gql from 'graphql-tag';
import { ApolloQueryResult } from '@apollo/client/core';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-notifica',
  templateUrl: './sistema-notifiche-graphql.component.html',
  styleUrls: ['./sistema-notifiche-graphql.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class NotificaComponent implements OnInit {
  @Output() notificheFetched = new EventEmitter<any[]>();

  notificaForm: FormGroup;
  items: any[] = [];
  totalCount: number = 0;
  loading: boolean = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private apolloService: ApolloService) {
    this.notificaForm = this.fb.group({
      notificaID: [null],
      destinatario: [null],
      visualizzazione: [null],
      consegna: [null],
      limit: [10],
      offset: [0],
    });
  }

  ngOnInit() {
    // Chiamata iniziale per fetchare le notifiche (opzionale)
    this.fetchNotifiche();
  }

  fetchNotifiche() {
    const GET_NOTIFICHE = gql`
      query GetSistemaNotifiche($params: ParamQueryInput, $filter: NotificaFilter) {
        getSistemaNotifiche(params: $params, filter: $filter) {
          items {
            notificaID
            text
            audio
            immagine
            video
            consegna
            visualizzazione
            destinatario
          }
          totalCount
        }
      }
    `;

    const params = {
      limit: this.notificaForm.value.limit,
      offset: this.notificaForm.value.offset,
    };

    const filter = {
      notificaID: this.notificaForm.value.notificaID,
      destinatario: this.notificaForm.value.destinatario,
      visualizzazione: this.notificaForm.value.visualizzazione,
      consegna: this.notificaForm.value.consegna,
    };

    this.loading = true;
    this.error = null;

    this.apolloService.getApolloClient()
      .query<{ getSistemaNotifiche: { items: any[]; totalCount: number } }>({
        query: GET_NOTIFICHE,
        variables: { params, filter },
      })
      .pipe(
        map((result: ApolloQueryResult<any>) => {
          return result.data.getSistemaNotifiche;
        })
      )
      .subscribe({
        next: (data) => {
          this.items = data.items;
          this.totalCount = data.totalCount;
          this.loading = false;

          this.notificheFetched.emit(this.items);
        },
        error: (err) => {
          console.error('Error fetching notifications:', err);
          this.error = 'An error occurred while fetching notifications.';
          this.loading = false;
        },
      });
  }
}
