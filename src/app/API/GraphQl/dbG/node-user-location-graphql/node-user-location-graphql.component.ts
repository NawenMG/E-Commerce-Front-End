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
  selector: 'app-node-user-location',
  templateUrl: './node-user-location-graphql.component.html',
  styleUrls: ['./node-user-location-graphql.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class NodeUserLocationComponent implements OnInit {
  @Output() locationsFetched = new EventEmitter<any[]>();

  nodeUserLocationForm: FormGroup;
  locations: any[] = [];
  totalCount: number = 0;
  loading: boolean = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private apolloService: ApolloService) {
    this.nodeUserLocationForm = this.fb.group({
      locationId: [null],
      city: [null],
      country: [null],
      limit: [10],
      skip: [0],
    });
  }

  ngOnInit() {
    // Chiamata iniziale per fetchare le località (opzionale)
    this.fetchNodeUserLocation();
  }

  fetchNodeUserLocation() {
    const GET_NODE_USER_LOCATION = gql`
      query GetNodeUserLocation($params: ParamQueryInput, $filter: NodeUserLocationFilter) {
        getNodeUserLocation(params: $params, filter: $filter) {
          locations {
            locationId
            city
            country
          }
          totalCount
        }
      }
    `;

    const params = {
      limit: this.nodeUserLocationForm.value.limit,
      skip: this.nodeUserLocationForm.value.skip,
    };

    const filter = {
      locationId: this.nodeUserLocationForm.value.locationId,
      city: this.nodeUserLocationForm.value.city,
      country: this.nodeUserLocationForm.value.country,
    };

    this.loading = true;
    this.error = null;

    this.apolloService.getApolloClient()
      .query<{ getNodeUserLocation: { locations: any[]; totalCount: number } }>({
        query: GET_NODE_USER_LOCATION,
        variables: { params, filter },
      })
      .pipe(
        map((result: ApolloQueryResult<any>) => {
          return result.data.getNodeUserLocation;
        })
      )
      .subscribe({
        next: (data) => {
          this.locations = data.locations;
          this.totalCount = data.totalCount;
          this.loading = false;

          this.locationsFetched.emit(this.locations);
        },
        error: (err) => {
          console.error('Error fetching node user locations:', err);
          this.error = 'An error occurred while fetching node user locations.';
          this.loading = false;
        },
      });
  }
}
