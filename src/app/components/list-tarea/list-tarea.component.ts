import { Component } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { Tarea } from '../../models/tarea.model';

@Component({
  selector: 'app-list-tarea',
  templateUrl: './list-tarea.component.html',
  styleUrls: ['./list-tarea.component.scss']
})
export class ListTareaComponent {

  public tareas: Tarea[] = [];

  constructor(private tareasService: TareasService) { }


  ngOnInit(): void {
    // Suscribirse al observable de tareas filtradas
    this.tareasService.tareasFiltradas$.subscribe(tareas => {
      this.tareas = tareas;
    });

    // Inicializar con todas las tareas
    this.tareas = this.tareasService.listarTareas();
  }
  
}
