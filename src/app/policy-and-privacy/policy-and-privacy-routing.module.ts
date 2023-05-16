import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyAndPrivacyComponent } from './policy-and-privacy.component';

const routes: Routes = [
  {
    path: '',
    component: PolicyAndPrivacyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyAndPrivacyRoutingModule {}
