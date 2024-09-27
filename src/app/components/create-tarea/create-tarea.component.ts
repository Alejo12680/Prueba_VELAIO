import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-tarea',
  templateUrl: './create-tarea.component.html',
  styleUrls: ['./create-tarea.component.scss']
})
export class CreateTareaComponent {

  public formCreateTarea!: FormGroup;
  public loading: boolean = false;
  public submitted: boolean = false;

  constructor (
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    // Este metodo es para editar el componente
    private aRouter: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.setFormTarea();

  }

  setFormTarea() {
    this.formCreateTarea = this.formBuilder.group({
      tarea: ['', Validators.required],
      descripcion: ['', Validators.required],
    })
  }

  agregarTarea() {

  }

}
