import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { CreateClientComponent } from './create-client/create-client.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      {
        path:'create-client',
        component: CreateClientComponent,
        pathMatch: 'full'
      },
      {
        path: 'create-admin',
        component: CreateAdminComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
