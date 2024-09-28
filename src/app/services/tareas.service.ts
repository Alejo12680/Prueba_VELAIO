import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tarea } from '../models/tarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private tareas: Tarea[] = [];
  private tareasFiltradasSubject = new BehaviorSubject<Tarea[]>([]);
  tareasFiltradas$ = this.tareasFiltradasSubject.asObservable();

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

    // Emitir todas las tareas al agregar
    this.tareasFiltradasSubject.next(this.tareas);
  }

  listarTareas(): Tarea[] {
    return [...this.tareas];
  }

  // Filtrar por estado
  filtrarTareas(estado: boolean) {
    const tareasFiltradas = this.tareas.filter(tareas => tareas.checked === estado);

     // Emitir tareas filtradas
    this.tareasFiltradasSubject.next(tareasFiltradas);
  }

  mostrarTodasLasTareas() {
    // Emitir todas las tareas
    this.tareasFiltradasSubject.next(this.tareas);
  }

}
