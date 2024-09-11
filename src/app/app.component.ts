import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-root',
  //Per i componenti senza ng-module
  //standalone: true,
  //imports: [RouterOutlet, PComponent],
  //
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent {




}
