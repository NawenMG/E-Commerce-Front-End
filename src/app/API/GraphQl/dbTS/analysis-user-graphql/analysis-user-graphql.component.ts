import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApolloService } from '../../graphqlapolloService.service'; // Assicurati di avere questo servizio implementato
import gql from 'graphql-tag';
import { ApolloQueryResult } from '@apollo/client/core';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-analysis-user',
  templateUrl: './analysis-user-graphql.component.html',
  styleUrls: ['./analysis-user-graphql.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class AnalysisUserComponent implements OnInit {
  @Output() analysisFetched = new EventEmitter<any[]>();

  analysisForm: FormGroup;
  items: any[] = [];
  totalCount: number = 0;
  loading: boolean = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private apolloService: ApolloService) {
    this.analysisForm = this.fb.group({
      user: [null],
      typeDevice: [null],
      action: [null],
      duringAction: [null],
      timestamp: [null],
      measurement: [null],
      timeRangeStart: [null],
      timeRangeEnd: [null],
      limit: [10],
      offset: [0],
    });
  }

  ngOnInit() {
    // Chiamata iniziale per fetchare i dati degli utenti (opzionale)
    this.fetchAnalysisUser();
  }

  fetchAnalysisUser() {
    const GET_ANALYSIS_USER = gql`
      query GetAnalysisUser($params: ParamQueryInput, $filter: AnalysisUserFilter) {
        getAnalysisUser(params: $params, filter: $filter) {
          items {
            user
            typeDevice
            action
            duringAction
            timestamp
          }
          totalCount
        }
      }
    `;

    const params = {
      measurement: this.analysisForm.value.measurement,
      timeRangeStart: this.analysisForm.value.timeRangeStart,
      timeRangeEnd: this.analysisForm.value.timeRangeEnd,
      limit: this.analysisForm.value.limit,
      offset: this.analysisForm.value.offset,
    };

    const filter = {
      user: this.analysisForm.value.user,
      typeDevice: this.analysisForm.value.typeDevice,
      action: this.analysisForm.value.action,
      duringAction: this.analysisForm.value.duringAction,
      timestamp: this.analysisForm.value.timestamp,
    };

    this.loading = true;
    this.error = null;

    this.apolloService.getApolloClient()
      .query<{ getAnalysisUser: { items: any[]; totalCount: number } }>({
        query: GET_ANALYSIS_USER,
        variables: { params, filter },
      })
      .pipe(
        map((result: ApolloQueryResult<any>) => {
          return result.data.getAnalysisUser;
        })
      )
      .subscribe({
        next: (data) => {
          this.items = data.items;
          this.totalCount = data.totalCount;
          this.loading = false;

          this.analysisFetched.emit(this.items);
        },
        error: (err) => {
          console.error('Error fetching analysis user:', err);
          this.error = 'An error occurred while fetching analysis user data.';
          this.loading = false;
        },
      });
  }
}
