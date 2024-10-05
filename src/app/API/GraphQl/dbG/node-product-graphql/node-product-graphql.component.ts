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
  selector: 'app-node-product',
  templateUrl: './node-product-graphql.component.html',
  styleUrls: ['./node-product-graphql.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class NodeProductComponent implements OnInit {
  @Output() productsFetched = new EventEmitter<any[]>();

  nodeProductForm: FormGroup;
  products: any[] = [];
  totalCount: number = 0;
  loading: boolean = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private apolloService: ApolloService) {
    this.nodeProductForm = this.fb.group({
      productId: [null],
      name: [null],
      price: [null],
      limit: [10],
      skip: [0],
    });
  }

  ngOnInit() {
    // Chiamata iniziale per fetchare i prodotti (opzionale)
    this.fetchNodeProduct();
  }

  fetchNodeProduct() {
    const GET_NODE_PRODUCT = gql`
      query GetNodeProduct($params: ParamQueryInput, $filter: NodeProductFilter) {
        getNodeProduct(params: $params, filter: $filter) {
          products {
            productId
            name
            price
            category {
              categoryId
              categoryName
            }
          }
          totalCount
        }
      }
    `;

    const params = {
      limit: this.nodeProductForm.value.limit,
      skip: this.nodeProductForm.value.skip,
    };

    const filter = {
      productId: this.nodeProductForm.value.productId,
      name: this.nodeProductForm.value.name,
      price: this.nodeProductForm.value.price,
    };

    this.loading = true;
    this.error = null;

    this.apolloService.getApolloClient()
      .query<{ getNodeProduct: { products: any[]; totalCount: number } }>({
        query: GET_NODE_PRODUCT,
        variables: { params, filter },
      })
      .pipe(
        map((result: ApolloQueryResult<any>) => {
          return result.data.getNodeProduct;
        })
      )
      .subscribe({
        next: (data) => {
          this.products = data.products;
          this.totalCount = data.totalCount;
          this.loading = false;

          this.productsFetched.emit(this.products);
        },
        error: (err) => {
          console.error('Error fetching node products:', err);
          this.error = 'An error occurred while fetching node products.';
          this.loading = false;
        },
      });
  }
}
