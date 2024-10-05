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
  selector: 'app-chat',
  templateUrl: './chat-graphql.component.html',
  styleUrls: ['./chat-graphql.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class ChatComponent implements OnInit {
  @Output() chatsFetched = new EventEmitter<any[]>();

  chatForm: FormGroup;
  items: any[] = [];
  totalCount: number = 0;
  loading: boolean = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private apolloService: ApolloService) {
    this.chatForm = this.fb.group({
      conversazioneID: [null],
      mutaConversazione: [null],
      bloccoConversazione: [null],
      users: [null],
      limit: [10],
      offset: [0],
    });
  }

  ngOnInit() {
    // Chiamata iniziale per fetchare le chat (opzionale)
    this.fetchChats();
  }

  fetchChats() {
    const GET_CHATS = gql`
      query GetChats($params: ParamQueryInput, $filter: ChatFilter) {
        getChats(params: $params, filter: $filter) {
          items {
            conversazioni {
              conversazioneID
              mutaConversazione
              bloccoConversazione
              users
              messaggi {
                text
                visualizzazione
                audio
                immagine
                video
                mittente
                destinatario
                timeStamp
              }
            }
          }
          totalCount
        }
      }
    `;

    const params = {
      limit: this.chatForm.value.limit,
      offset: this.chatForm.value.offset,
    };

    const filter = {
      conversazioneID: this.chatForm.value.conversazioneID,
      mutaConversazione: this.chatForm.value.mutaConversazione,
      bloccoConversazione: this.chatForm.value.bloccoConversazione,
      users: this.chatForm.value.users,
    };

    this.loading = true;
    this.error = null;

    this.apolloService.getApolloClient()
      .query<{ getChats: { items: any[]; totalCount: number } }>({
        query: GET_CHATS,
        variables: { params, filter },
      })
      .pipe(
        map((result: ApolloQueryResult<any>) => {
          return result.data.getChats;
        })
      )
      .subscribe({
        next: (data) => {
          this.items = data.items;
          this.totalCount = data.totalCount;
          this.loading = false;

          this.chatsFetched.emit(this.items);
        },
        error: (err) => {
          console.error('Error fetching chats:', err);
          this.error = 'An error occurred while fetching chats.';
          this.loading = false;
        },
      });
  }
}
