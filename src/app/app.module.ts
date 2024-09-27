import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateTareaComponent } from './components/create-tarea/create-tarea.component';
import { ListTareaComponent } from './components/list-tarea/list-tarea.component';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

// Componente Standalone
import { PersonaComponent } from "./persona/persona.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreateTareaComponent,
    ListTareaComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    PersonaComponent
],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
