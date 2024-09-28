import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CreateTareaComponent } from '../components/create-tarea/create-tarea.component';

@Component({
  selector: 'app-persona',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, BrowserModule, AppRoutingModule],
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent {

  public formCreaPersona!: FormGroup;
  public listaHabilidades: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public componenteCrtTarea: CreateTareaComponent
  ) { }

  ngOnInit(): void {
    this.setFormPersona();
  }

  setFormPersona() {
    this.formCreaPersona = this.formBuilder.group({
      nombrePersona: ['', [Validators.required, Validators.minLength(5)]],
      edadPersona: ['', [Validators.required, Validators.min(19), Validators.max(99)]],
      habilidades: ['', Validators.required],
    })
  }

  anadirHabilidad() {
    let habilidad = this.formCreaPersona.get('habilidades')?.value;

    if (habilidad !== null && habilidad !== '') {
      if (!this.listaHabilidades.includes(habilidad)) {
        this.listaHabilidades.push(habilidad);

      } else {
        this.toastr.error('Habilidad ya existe, ingrese otra por favor', 'Error en la Peticion', { timeOut: 3000 });
      }
    }
  }

  eliminarHabilidad(indice: number) {
    this.listaHabilidades.splice(indice, 1);
  }

  existePersona(nombre: string): boolean {
    return this.componenteCrtTarea.listaPersonas.some(persona => persona.nombre.toLowerCase().trim() === nombre.toLowerCase().trim());
  }

  agregarPersona() {
    let nombrePersona = this.formCreaPersona.value.nombrePersona;

    if (this.formCreaPersona.status === 'VALID' && this.listaHabilidades.length > 0) {

      if (!this.existePersona(nombrePersona)) {
        // Añade persona al array de personas
        this.componenteCrtTarea.listaPersonas.unshift({ nombre: this.formCreaPersona.value.nombrePersona, edad: this.formCreaPersona.value.edadPersona, habilidades: this.listaHabilidades });

        this.formCreaPersona.reset();
        this.listaHabilidades = [];
        this.componenteCrtTarea.validatorPersona = true;

      } else {
        this.toastr.error('Esta persona ya existe en la lista', 'Error', { timeOut: 3000 });
      }

    } else {

      if (this.listaHabilidades.length === 0) {
        this.toastr.error('Se debe tener al menos una Habilidad', 'Error en la Peticion', { timeOut: 3000 });
      }

      if (this.formCreaPersona.status === 'INVALID') {
        this.toastr.error('Todos los campos son Obligatorios', 'Error en la Peticion', { timeOut: 3000 });
      }

      if (nombrePersona === nombrePersona) {
        this.toastr.error('No se Puede Agregar a la misma Persona', 'Error en la Peticion', { timeOut: 3000 });
      }

      this.formCreaPersona.markAllAsTouched();
    }
  }

}
