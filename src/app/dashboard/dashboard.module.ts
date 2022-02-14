import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    CreateClientComponent,
    CreateAdminComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
