import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TareasService } from '../../services/tareas.service';
import { Persona } from 'src/app/models/tarea.model';

@Component({
  selector: 'app-create-tarea',
  templateUrl: './create-tarea.component.html',
  styleUrls: ['./create-tarea.component.scss']
})
export class CreateTareaComponent {

  public formCreateTarea!: FormGroup;
  public loading: boolean = false;
  public submitted: boolean = false;
  public listaHabilidades: any = [];
  public validatorPersona: boolean = false;
  public listaPersonas: Persona[] = []

  constructor(
    private formBuilder: FormBuilder,
    private tareasService: TareasService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.setFormTarea();
  }

  setFormTarea() {
    this.formCreateTarea = this.formBuilder.group({
      tarea: ['', [Validators.required, Validators.minLength(4)]],
      fechaLimite: ['', [Validators.required, this.fechaActualValidator]],
    })
  }

  fechaActualValidator(control: any) {
    const fechaSeleccionada = new Date(control.value);
    const fechaActual = new Date();

    // Comprobamos si el valor es una fecha válida
    if (isNaN(fechaSeleccionada.getTime())) {
      return null; // Si no es una fecha válida, no hay error
    }

    // Establecer horas a cero para comparación solo de fecha
    fechaActual.setHours(0, 0, 0, 0);
    fechaSeleccionada.setHours(0, 0, 0, 0);

    // Comparamos las fechas
    return fechaSeleccionada >= fechaActual ? null : { fechaInvalida: true };
  }

  eliminarPersona(indice: number) {
    this.listaPersonas.splice(indice, 1);
  }

  agregarTarea() {
    if (this.formCreateTarea.status === 'VALID' && this.validatorPersona === true) {

      let estructura = {
        "tarea": this.formCreateTarea.value.tarea,
        "fechaLimite": this.formCreateTarea.value.fechaLimite,
        "checked": false,
        "personas": this.listaPersonas
      }

      // Servicio Angular
      this.tareasService.agregarTarea(estructura);

      this.loading = true;
      this.formCreateTarea.reset();
      this.toastr.success('Tarea Registrada con Exito', 'Se agrego una tarea', {timeOut: 2000});
      this.router.navigate(['../list-tarea/list-tarea.component.html']);

    } else {
      if (this.formCreateTarea.status === 'INVALID') {
        this.toastr.error('Todos los campos son Obligatorios', 'Error en la Peticion', {timeOut: 3000});
      }

      if (this.validatorPersona === false) {
        this.toastr.error('Agregar una Perosona es Obligatorio', 'Error en la Peticion', {timeOut: 3000});
      }

      this.formCreateTarea.markAllAsTouched();
    }

  }

}
