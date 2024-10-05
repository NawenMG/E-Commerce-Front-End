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
  selector: 'app-products',
  templateUrl: './products-graphql.component.html',
  styleUrls: ['./products-graphql.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class ProductsComponent implements OnInit {
  @Output() productsFetched = new EventEmitter<any[]>();

  productsForm: FormGroup;
  items: any[] = [];
  totalCount: number = 0;
  loading: boolean = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private apolloService: ApolloService) {
    this.productsForm = this.fb.group({
      productId: [null],
      nome: [null],
      prezzo: [null],
      descrizione: [null],
      immagine: [null],
      amountAvailable: [null],
      categoria: [null],
      dataDiInserimento: [null],
      limit: [10],
      offset: [0],
    });
  }

  ngOnInit() {
    // Chiamata iniziale per fetchare i prodotti (opzionale)
    this.fetchProducts();
  }

  fetchProducts() {
    const GET_PRODUCTS = gql`
      query GetProducts($params: ParamQueryInput, $filter: ProductsFilter) {
        getProducts(params: $params, filter: $filter) {
          items {
            productId
            nome
            prezzo
            descrizione
            immagine
            amountAvailable
            categoria
            dataDiInserimento
          }
          totalCount
        }
      }
    `;

    const params = {
      limit: this.productsForm.value.limit,
      offset: this.productsForm.value.offset,
    };

    const filter = {
      productId: this.productsForm.value.productId,
      nome: this.productsForm.value.nome,
      prezzo: this.productsForm.value.prezzo,
      descrizione: this.productsForm.value.descrizione,
      immagine: this.productsForm.value.immagine,
      amountAvailable: this.productsForm.value.amountAvailable,
      categoria: this.productsForm.value.categoria,
      dataDiInserimento: this.productsForm.value.dataDiInserimento,
    };

    this.loading = true;
    this.error = null;

    this.apolloService.getApolloClient()
      .query<{ getProducts: { items: any[]; totalCount: number } }>({
        query: GET_PRODUCTS,
        variables: { params, filter },
      })
      .pipe(
        map((result: ApolloQueryResult<any>) => {
          return result.data.getProducts;
        })
      )
      .subscribe({
        next: (data) => {
          this.items = data.items;
          this.totalCount = data.totalCount;
          this.loading = false;

          this.productsFetched.emit(this.items);
        },
        error: (err) => {
          console.error('Error fetching products:', err);
          this.error = 'An error occurred while fetching products.';
          this.loading = false;
        },
      });
  }
}
