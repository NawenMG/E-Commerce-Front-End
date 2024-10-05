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
  selector: 'app-wish-list',
  templateUrl: './wishlist-graphql.component.html',
  styleUrls: ['./wishlist-graphql.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class WishListComponent implements OnInit {
  @Output() wishListFetched = new EventEmitter<any[]>();

  wishListForm: FormGroup;
  items: any[] = [];
  totalCount: number = 0;
  loading: boolean = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private apolloService: ApolloService) {
    this.wishListForm = this.fb.group({
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
    // Chiamata iniziale per fetchare la wishlist (opzionale)
    this.fetchWishList();
  }

  fetchWishList() {
    const GET_WISH_LIST = gql`
      query GetWishList($params: ParamQueryInput, $filter: WishListFilter) {
        getWishList(params: $params, filter: $filter) {
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
      limit: this.wishListForm.value.limit,
      offset: this.wishListForm.value.offset,
    };

    const filter = {
      userID: this.wishListForm.value.userID,
      productID: this.wishListForm.value.productID,
      productName: this.wishListForm.value.productName,
      productPrice: this.wishListForm.value.productPrice,
      productCompany: this.wishListForm.value.productCompany,
    };

    this.loading = true;
    this.error = null;

    this.apolloService.getApolloClient()
      .query<{ getWishList: { items: any[]; totalCount: number } }>({
        query: GET_WISH_LIST,
        variables: { params, filter },
      })
      .pipe(
        map((result: ApolloQueryResult<any>) => {
          return result.data.getWishList;
        })
      )
      .subscribe({
        next: (data) => {
          this.items = data.items;
          this.totalCount = data.totalCount;
          this.loading = false;

          this.wishListFetched.emit(this.items);
        },
        error: (err) => {
          console.error('Error fetching wishlist:', err);
          this.error = 'An error occurred while fetching wishlist items.';
          this.loading = false;
        },
      });
  }
}
