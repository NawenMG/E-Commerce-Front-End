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
  selector: 'app-settings',
  templateUrl: './settings-graphql.component.html',
  styleUrls: ['./settings-graphql.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class SettingsComponent implements OnInit {
  @Output() settingsFetched = new EventEmitter<any[]>();

  settingsForm: FormGroup;
  items: any[] = [];
  totalCount: number = 0;
  loading: boolean = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private apolloService: ApolloService) {
    this.settingsForm = this.fb.group({
      userID: [null],
      settingID: [null],
      prodottiPerPagina: [null],
      tema: [null],
      layout: [null],
      lingua: [null],
      limit: [10],
      offset: [0],
    });
  }

  ngOnInit() {
    // Chiamata iniziale per fetchare gli elementi delle impostazioni (opzionale)
    this.fetchSettings();
  }

  fetchSettings() {
    const GET_SETTINGS = gql`
      query GetSettings($params: ParamQueryInput, $filter: SettingsFilter) {
        getSettings(params: $params, filter: $filter) {
          items {
            userID
            settingID
            prodottiPerPagina
            tema
            layout
            lingua
            notifiche
          }
          totalCount
        }
      }
    `;

    const params = {
      limit: this.settingsForm.value.limit,
      offset: this.settingsForm.value.offset,
    };

    const filter = {
      userID: this.settingsForm.value.userID,
      settingID: this.settingsForm.value.settingID,
      prodottiPerPagina: this.settingsForm.value.prodottiPerPagina,
      tema: this.settingsForm.value.tema,
      layout: this.settingsForm.value.layout,
      lingua: this.settingsForm.value.lingua,
    };

    this.loading = true;
    this.error = null;

    this.apolloService.getApolloClient()
      .query<{ getSettings: { items: any[]; totalCount: number } }>({
        query: GET_SETTINGS,
        variables: { params, filter },
      })
      .pipe(
        map((result: ApolloQueryResult<any>) => {
          return result.data.getSettings;
        })
      )
      .subscribe({
        next: (data) => {
          this.items = data.items;
          this.totalCount = data.totalCount;
          this.loading = false;

          this.settingsFetched.emit(this.items);
        },
        error: (err) => {
          console.error('Error fetching settings:', err);
          this.error = 'An error occurred while fetching settings items.';
          this.loading = false;
        },
      });
  }
}
