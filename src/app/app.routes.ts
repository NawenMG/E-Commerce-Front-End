import { Routes } from '@angular/router';
import { AdminDashComponent } from './Admindash/admin-dash/admin-dash.component';
import { ControllerDashComponent } from './Controllerdash/controller-dash/controller-dash.component';
import { DeliveryDashComponent } from './Deliverydash/delivery-dash/delivery-dash.component';
import { HomeComponent } from './Home/home/home.component';
import { LoginComponent } from './login/login.component';
import { PaginazioneComponent } from './Paginazione/paginazione/paginazione.component';
import { ProductSellComponent } from './Product-Sell/product-sell/product-sell.component';
import { ProfiloComponent } from './Profile/profilo/profilo.component';
import { RegistrazioneComponent } from './Registrazione/registrazione/registrazione.component';
import { ProdottoComponent } from './Prodotto/prodotto/prodotto.component';
import * as path from 'path'; // Se stai usando CommonJS


export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'Home', component: HomeComponent},
  {path: 'Registrazione', component: RegistrazioneComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'Prodotto', component: ProdottoComponent},
  {path: 'Paginazione', component: PaginazioneComponent},
  {path: 'Profilo', component:ProfiloComponent},
  {path: 'Admin', component: AdminDashComponent},
  {path: 'Controller', component: ControllerDashComponent},
  {path: 'Delivery', component: DeliveryDashComponent},
  {path: 'Sell', component: ProductSellComponent},
  {path: '**', component: HomeComponent}
];
