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
  selector: 'app-cronologia',
  templateUrl: './cronologia-graphql.component.html',
  styleUrls: ['./cronologia-graphql.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class CronologiaComponent implements OnInit {
  @Output() cronologiaFetched = new EventEmitter<any[]>();

  cronologiaForm: FormGroup;
  items: any[] = [];
  totalCount: number = 0;
  loading: boolean = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private apolloService: ApolloService) {
    this.cronologiaForm = this.fb.group({
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
    // Chiamata iniziale per fetchare gli elementi della cronologia (opzionale)
    this.fetchCronologia();
  }

  fetchCronologia() {
    const GET_CRONOLOGIA = gql`
      query GetCronologia($params: ParamQueryInput, $filter: CronologiaFilter) {
        getCronologia(params: $params, filter: $filter) {
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
      limit: this.cronologiaForm.value.limit,
      offset: this.cronologiaForm.value.offset,
    };

    const filter = {
      userID: this.cronologiaForm.value.userID,
      productID: this.cronologiaForm.value.productID,
      productName: this.cronologiaForm.value.productName,
      productPrice: this.cronologiaForm.value.productPrice,
      productCompany: this.cronologiaForm.value.productCompany,
    };

    this.loading = true;
    this.error = null;

    this.apolloService.getApolloClient()
      .query<{ getCronologia: { items: any[]; totalCount: number } }>({
        query: GET_CRONOLOGIA,
        variables: { params, filter },
      })
      .pipe(
        map((result: ApolloQueryResult<any>) => {
          return result.data.getCronologia;
        })
      )
      .subscribe({
        next: (data) => {
          this.items = data.items;
          this.totalCount = data.totalCount;
          this.loading = false;

          this.cronologiaFetched.emit(this.items);
        },
        error: (err) => {
          console.error('Error fetching cronologia:', err);
          this.error = 'An error occurred while fetching cronologia items.';
          this.loading = false;
        },
      });
  }
}
