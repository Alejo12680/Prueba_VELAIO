import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateTareaComponent } from './components/create-tarea/create-tarea.component';
import { ListTareaComponent } from './components/list-tarea/list-tarea.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreateTareaComponent,
    ListTareaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
