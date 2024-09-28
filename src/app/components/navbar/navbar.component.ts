import { Component } from '@angular/core';
import { TareasService } from '../../services/tareas.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private tareasService: TareasService) { }


  pendientes(estado: boolean) {
    this.tareasService.filtrarTareas(estado);
  }

  mostrarTodas() {
    this.tareasService.mostrarTodasLasTareas();
  }

}
