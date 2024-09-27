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
  imports: [CommonModule, ReactiveFormsModule, FormsModule, BrowserModule, AppRoutingModule ],
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
      edadPersona: ['', [Validators.required, Validators.min(19)]],
      habilidades: ['', Validators.required],
    })
  }

  anadirHabilidad() {
    let habilidad = this.formCreaPersona.get('habilidades')?.value;

    if (habilidad !== null && habilidad !== '') {
      if (!this.listaHabilidades.includes(habilidad)) {
        this.listaHabilidades.push(habilidad);

      } else {
        this.toastr.error('Habilidad ya existe, ingrese otra por favor', 'Error en la Peticion', {timeOut: 3000});
      }

    }
  }

  eliminarHabilidad(valor: number) {
    console.log(valor);

    const index = this.listaHabilidades.indexOf(valor);
    if (index !== -1) {
      this.listaHabilidades.splice(index, 1);
    }
  }

  agregarPersona() {
    if (this.formCreaPersona.status === 'VALID' ) {
      this.componenteCrtTarea.listaPersonas.push({nombre: this.formCreaPersona.value.nombrePersona, edad: this.formCreaPersona.value.edadPersona, habilidades: this.listaHabilidades})
      this.componenteCrtTarea.validatorPersona = true;

    } else {

      this.formCreaPersona.markAllAsTouched();
      this.toastr.error('Todos los campos son Obligatorios', 'Error en la Peticion', {timeOut: 3000});
    }
  }

}
