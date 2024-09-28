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

  buscarTareas(textoBusqueda: string) {
    const tareasFiltradas = this.tareas.filter(tarea =>
      tarea.tarea.toLowerCase().includes(textoBusqueda.toLowerCase())
    );
    this.tareasFiltradasSubject.next(tareasFiltradas); // Emitir las tareas filtradas
  }

}
