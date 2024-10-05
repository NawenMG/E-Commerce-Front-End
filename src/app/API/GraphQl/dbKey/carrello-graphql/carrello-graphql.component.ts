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
  selector: 'app-carrello',
  templateUrl: './carrello-graphql.component.html',
  styleUrls: ['./carrello-graphql.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class CarrelloComponent implements OnInit {
  @Output() carrelloFetched = new EventEmitter<any[]>();

  carrelloForm: FormGroup;
  items: any[] = [];
  totalCount: number = 0;
  loading: boolean = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private apolloService: ApolloService) {
    this.carrelloForm = this.fb.group({
      userID: [null],
      productID: [null],
      productName: [null],
      productPrice: [null],
      productCompany: [null],
      limit: [10],
      offset: [0],
    });
  }

  ngOnInit() {
    // Chiamata iniziale per fetchare gli elementi del carrello (opzionale)
    this.fetchCarrello();
  }

  fetchCarrello() {
    const GET_CARRELLO = gql`
      query GetCarrello($params: ParamQueryInput, $filter: CarrelloFilter) {
        getCarrello(params: $params, filter: $filter) {
          items {
            userID
            productID
            productName
            productPrice
            productImage
            productText
            productCompany
          }
          totalCount
        }
      }
    `;

    const params = {
      limit: this.carrelloForm.value.limit,
      offset: this.carrelloForm.value.offset,
    };

    const filter = {
      userID: this.carrelloForm.value.userID,
      productID: this.carrelloForm.value.productID,
      productName: this.carrelloForm.value.productName,
      productPrice: this.carrelloForm.value.productPrice,
      productCompany: this.carrelloForm.value.productCompany,
    };

    this.loading = true;
    this.error = null;

    this.apolloService.getApolloClient()
      .query<{ getCarrello: { items: any[]; totalCount: number } }>({
        query: GET_CARRELLO,
        variables: { params, filter },
      })
      .pipe(
        map((result: ApolloQueryResult<any>) => {
          return result.data.getCarrello;
        })
      )
      .subscribe({
        next: (data) => {
          this.items = data.items;
          this.totalCount = data.totalCount;
          this.loading = false;

          this.carrelloFetched.emit(this.items);
        },
        error: (err) => {
          console.error('Error fetching carrello:', err);
          this.error = 'An error occurred while fetching carrello items.';
          this.loading = false;
        },
      });
  }
}
