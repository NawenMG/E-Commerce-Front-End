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
  selector: 'app-node-category-product',
  templateUrl: './node-category-product-graphql.component.html',
  styleUrls: ['./node-category-product-graphql.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class NodeCategoryProductComponent implements OnInit {
  @Output() categoriesFetched = new EventEmitter<any[]>();

  nodeCategoryProductForm: FormGroup;
  categories: any[] = [];
  totalCount: number = 0;
  loading: boolean = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private apolloService: ApolloService) {
    this.nodeCategoryProductForm = this.fb.group({
      categoryId: [null],
      categoryName: [null],
      limit: [10],
      skip: [0],
    });
  }

  ngOnInit() {
    // Chiamata iniziale per fetchare le categorie (opzionale)
    this.fetchNodeCategoryProduct();
  }

  fetchNodeCategoryProduct() {
    const GET_NODE_CATEGORY_PRODUCT = gql`
      query GetNodeCategoryProduct($params: ParamQueryInput, $filter: NodeCategoryProductFilter) {
        getNodeCategoryProduct(params: $params, filter: $filter) {
          categories {
            categoryId
            categoryName
          }
          totalCount
        }
      }
    `;

    const params = {
      limit: this.nodeCategoryProductForm.value.limit,
      skip: this.nodeCategoryProductForm.value.skip,
    };

    const filter = {
      categoryId: this.nodeCategoryProductForm.value.categoryId,
      categoryName: this.nodeCategoryProductForm.value.categoryName,
    };

    this.loading = true;
    this.error = null;

    this.apolloService.getApolloClient()
      .query<{ getNodeCategoryProduct: { categories: any[]; totalCount: number } }>({
        query: GET_NODE_CATEGORY_PRODUCT,
        variables: { params, filter },
      })
      .pipe(
        map((result: ApolloQueryResult<any>) => {
          return result.data.getNodeCategoryProduct;
        })
      )
      .subscribe({
        next: (data) => {
          this.categories = data.categories;
          this.totalCount = data.totalCount;
          this.loading = false;

          this.categoriesFetched.emit(this.categories);
        },
        error: (err) => {
          console.error('Error fetching node category products:', err);
          this.error = 'An error occurred while fetching node category products.';
          this.loading = false;
        },
      });
  }
}
