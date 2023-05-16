import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManagePage } from './manage.page';

import { ManagePageRoutingModule } from './manage-routing.module'
import { EmployeePageModule } from './employee/employee.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: ManagePage }]),
    ManagePageRoutingModule,
    EmployeePageModule
  ],
  declarations: [ManagePage]
})
export class ManagePageModule {}
