import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './appModule.module'; // Importa il tuo AppModule
import { AppComponent } from './app.component'; // Importa il tuo AppComponent

@NgModule({
  imports: [
    AppModule, // Importa il modulo principale della tua app
    ServerModule // Importa il ServerModule
  ],
  bootstrap: [AppComponent] // Dichiara il componente principale da avviare
})
export class AppServerModule {}
