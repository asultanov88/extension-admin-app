import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './login/admin-login/admin-login.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'admin-login',
    pathMatch:'full'
  },
  {
    path:'admin-login',
    component: AdminLoginComponent,
  },
  {
    path:'admin-dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(module => module.DashboardModule),
  },
  {
    path: '**',
    redirectTo: 'admin-login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
