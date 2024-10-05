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
  selector: 'app-categories',
  templateUrl: './categories-graphql.component.html',
  styleUrls: ['./categories-graphql.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class CategoriesComponent implements OnInit {
  @Output() categoriesFetched = new EventEmitter<any[]>();

  categoriesForm: FormGroup;
  items: any[] = [];
  totalCount: number = 0;
  loading: boolean = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private apolloService: ApolloService) {
    this.categoriesForm = this.fb.group({
      categoriesID: [null],
      name: [null],
      limit: [10],
      offset: [0],
    });
  }

  ngOnInit() {
    // Chiamata iniziale per fetchare le categorie (opzionale)
    this.fetchCategories();
  }

  fetchCategories() {
    const GET_CATEGORIES = gql`
      query GetCategories($params: ParamQueryInput, $filter: CategoriesFilter) {
        getCategories(params: $params, filter: $filter) {
          items {
            categoriesID
            name
          }
          totalCount
        }
      }
    `;

    const params = {
      limit: this.categoriesForm.value.limit,
      offset: this.categoriesForm.value.offset,
    };

    const filter = {
      categoriesID: this.categoriesForm.value.categoriesID,
      name: this.categoriesForm.value.name,
    };

    this.loading = true;
    this.error = null;

    this.apolloService.getApolloClient()
      .query<{ getCategories: { items: any[]; totalCount: number } }>({
        query: GET_CATEGORIES,
        variables: { params, filter },
      })
      .pipe(
        map((result: ApolloQueryResult<any>) => {
          return result.data.getCategories;
        })
      )
      .subscribe({
        next: (data) => {
          this.items = data.items;
          this.totalCount = data.totalCount;
          this.loading = false;

          this.categoriesFetched.emit(this.items);
        },
        error: (err) => {
          console.error('Error fetching categories:', err);
          this.error = 'An error occurred while fetching categories.';
          this.loading = false;
        },
      });
  }
}
