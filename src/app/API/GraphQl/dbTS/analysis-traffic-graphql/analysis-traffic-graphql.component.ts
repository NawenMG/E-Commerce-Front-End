import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApolloService } from '../../graphqlapolloService.service'; // Assicurati di avere questo servizio implementato
import gql from 'graphql-tag';
import { ApolloQueryResult } from '@apollo/client/core';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-analysis-traffic',
  templateUrl: './analysis-traffic-graphql.component.html',
  styleUrls: ['./analysis-traffic-graphql.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class AnalysisTrafficComponent implements OnInit {
  @Output() analysisFetched = new EventEmitter<any[]>();

  analysisForm: FormGroup;
  items: any[] = [];
  totalCount: number = 0;
  loading: boolean = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private apolloService: ApolloService) {
    this.analysisForm = this.fb.group({
      url: [null],
      numeroVisite: [null],
      numeroVisiteUniche: [null],
      durataMediaVisite: [null],
      timeStamp: [null],
      measurement: [null],
      timeRangeStart: [null],
      timeRangeEnd: [null],
      limit: [10],
      offset: [0],
    });
  }

  ngOnInit() {
    // Chiamata iniziale per fetchare i dati di traffico (opzionale)
    this.fetchAnalysisTraffic();
  }

  fetchAnalysisTraffic() {
    const GET_ANALYSIS_TRAFFIC = gql`
      query GetAnalysisTraffic($params: ParamQueryInput, $filter: AnalysisTrafficFilter) {
        getAnalysisTraffic(params: $params, filter: $filter) {
          items {
            url
            numeroVisite
            numeroVisiteUniche
            durataMediaVisite
            timeStamp
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
      url: this.analysisForm.value.url,
      numeroVisite: this.analysisForm.value.numeroVisite,
      numeroVisiteUniche: this.analysisForm.value.numeroVisiteUniche,
      durataMediaVisite: this.analysisForm.value.durataMediaVisite,
      timeStamp: this.analysisForm.value.timeStamp,
    };

    this.loading = true;
    this.error = null;

    this.apolloService.getApolloClient()
      .query<{ getAnalysisTraffic: { items: any[]; totalCount: number } }>({
        query: GET_ANALYSIS_TRAFFIC,
        variables: { params, filter },
      })
      .pipe(
        map((result: ApolloQueryResult<any>) => {
          return result.data.getAnalysisTraffic;
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
          console.error('Error fetching analysis traffic:', err);
          this.error = 'An error occurred while fetching analysis traffic.';
          this.loading = false;
        },
      });
  }
}
