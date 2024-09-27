import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
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
      fechaLimite: ['', Validators.required],
    })
  }


  agregarTarea() {
    this.submitted = false;

    if (this.formCreateTarea.status === 'VALID' && this.validatorPersona === true) {

      this.tareasService.agregarTarea(this.formCreateTarea.value);
      this.formCreateTarea.reset();
      this.toastr.success('Tarea Registrada con Exito', 'Se agrego una tarea');
      this.loading = true;

      this.router.navigate(['../list-tarea/list-tarea.component.html'])

    } else {
      this.submitted = true;
      this.formCreateTarea.markAllAsTouched();
      /* console.log(this.formCreateTarea.status); */
      /* this.toastr.error('Error en la Peticion', Error.error); */
      this.toastr.error('Todos los campos son Obligatorios', 'Error en la Peticion', {timeOut: 3000});

      if (this.validatorPersona === false) {
        this.toastr.error('Agregar una Perosona es Obligatorio', 'Error en la Peticion', {timeOut: 3000});
      }
    }

  }

}
