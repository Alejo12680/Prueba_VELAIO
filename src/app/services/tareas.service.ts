import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Tarea } from '../models/tarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private tareas: Tarea[] = [];

  constructor() { }

  // Variables en las que se suscribe y se hace llamado del observable.
  private filtroTextoSubject = new BehaviorSubject<string>('');
  filtroTexto$ = this.filtroTextoSubject.asObservable();

  // Servicio que transmite el observable, para el buscador del componente, este es un observable que suscribe el componente que necesite la informacion y haciendolo reactivo.
  setFiltroTexto(texto: string) {
    this.filtroTextoSubject.next(texto);
  }
  // ******************************************************************

  agregarTarea(tarea: Tarea) {
    this.tareas.push(tarea);
  }

  listarTareas(): Tarea[] {
    return this.tareas;
  }

  // Filtrar por estado
  /* filtrarTareas(estado: 'pendiente' | 'completada'): Tarea[] {
    return this.tareas.filter(tareas => tareas.estado === estado);
  } */

  // Marcar tarea como completada
  /* completarTarea(tarea: Tarea) {
    const index = this.tareas.indexOf(tarea);
    if (index !== -1) {
      this.tareas[index].estado = 'completada';
    }
  } */

}
