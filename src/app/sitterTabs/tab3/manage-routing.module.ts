import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagePage } from './manage.page';
import { EmployeePage } from './employee/employee.page';

const routes: Routes = [
  {
    path: '',
    component: ManagePage
  },
  {
    path: 'employee/:action',
    component: EmployeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagePageRoutingModule {}
