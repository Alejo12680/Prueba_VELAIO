import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo:'listTareas',
    pathMatch:'full'
  },

  // URL que no corresponde a ningun componente, es redirigido.
  {
    path:'**',
    redirectTo:'listTareas',
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
