import { ModuleComponent } from './components/module/module.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  {path: 'module', component: ModuleComponent}
  // {path: 'services', component: ServiceComponent},
  // {path: 'projects', component: ProjectComponent},
  // {path: 'aboutus', component: AboutusComponent},
  // {path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
