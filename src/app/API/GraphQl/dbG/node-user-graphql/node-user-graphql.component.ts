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
  selector: 'app-node-user',
  templateUrl: './node-user-graphql.component.html',
  styleUrls: ['./node-user-graphql.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class NodeUserComponent implements OnInit {
  @Output() usersFetched = new EventEmitter<any[]>();

  nodeUserForm: FormGroup;
  users: any[] = [];
  totalCount: number = 0;
  loading: boolean = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private apolloService: ApolloService) {
    this.nodeUserForm = this.fb.group({
      userId: [null],
      name: [null],
      email: [null],
      location: [null],
      limit: [10],
      skip: [0],
    });
  }

  ngOnInit() {
    // Chiamata iniziale per fetchare gli utenti (opzionale)
    this.fetchNodeUser();
  }

  fetchNodeUser() {
    const GET_NODE_USER = gql`
      query GetNodeUser($params: ParamQueryInput, $filter: NodeUserFilter) {
        getNodeUser(params: $params, filter: $filter) {
          users {
            userId
            name
            email
            location
            purchasedProducts {
              productId
              name
              price
            }
            visitedProducts {
              productId
              name
              price
            }
            nodeUserLocation {
              // Aggiungi qui i campi di NodeUserLocation se necessari
            }
          }
          totalCount
        }
      }
    `;

    const params = {
      limit: this.nodeUserForm.value.limit,
      skip: this.nodeUserForm.value.skip,
    };

    const filter = {
      userId: this.nodeUserForm.value.userId,
      name: this.nodeUserForm.value.name,
      email: this.nodeUserForm.value.email,
      location: this.nodeUserForm.value.location,
    };

    this.loading = true;
    this.error = null;

    this.apolloService.getApolloClient()
      .query<{ getNodeUser: { users: any[]; totalCount: number } }>({
        query: GET_NODE_USER,
        variables: { params, filter },
      })
      .pipe(
        map((result: ApolloQueryResult<any>) => {
          return result.data.getNodeUser;
        })
      )
      .subscribe({
        next: (data) => {
          this.users = data.users;
          this.totalCount = data.totalCount;
          this.loading = false;

          this.usersFetched.emit(this.users);
        },
        error: (err) => {
          console.error('Error fetching node users:', err);
          this.error = 'An error occurred while fetching node users.';
          this.loading = false;
        },
      });
  }
}
