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
  selector: 'app-users',
  templateUrl: './users-graphql.component.html',
  styleUrls: ['./users-graphql.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class UsersComponent implements OnInit {
  @Output() usersFetched = new EventEmitter<any[]>();

  usersForm: FormGroup;
  items: any[] = [];
  totalCount: number = 0;
  loading: boolean = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private apolloService: ApolloService) {
    this.usersForm = this.fb.group({
      usersID: [null],
      nome: [null],
      cognome: [null],
      ruolo: [null],
      nomeUtente: [null],
      email: [null],
      category: [null],
      limit: [10],
      offset: [0],
    });
  }

  ngOnInit() {
    // Chiamata iniziale per fetchare gli utenti (opzionale)
    this.fetchUsers();
  }

  fetchUsers() {
    const GET_USERS = gql`
      query GetUsers($params: ParamQueryInput, $filter: UsersFilter) {
        getUsers(params: $params, filter: $filter) {
          items {
            usersID
            nome
            cognome
            ruolo
            nomeUtente
            email
            immagine
            category
          }
          totalCount
        }
      }
    `;

    const params = {
      limit: this.usersForm.value.limit,
      offset: this.usersForm.value.offset,
    };

    const filter = {
      usersID: this.usersForm.value.usersID,
      nome: this.usersForm.value.nome,
      cognome: this.usersForm.value.cognome,
      ruolo: this.usersForm.value.ruolo,
      nomeUtente: this.usersForm.value.nomeUtente,
      email: this.usersForm.value.email,
      category: this.usersForm.value.category,
    };

    this.loading = true;
    this.error = null;

    this.apolloService.getApolloClient()
      .query<{ getUsers: { items: any[]; totalCount: number } }>({
        query: GET_USERS,
        variables: { params, filter },
      })
      .pipe(
        map((result: ApolloQueryResult<any>) => {
          return result.data.getUsers;
        })
      )
      .subscribe({
        next: (data) => {
          this.items = data.items;
          this.totalCount = data.totalCount;
          this.loading = false;

          this.usersFetched.emit(this.items);
        },
        error: (err) => {
          console.error('Error fetching users:', err);
          this.error = 'An error occurred while fetching users.';
          this.loading = false;
        },
      });
  }
}
