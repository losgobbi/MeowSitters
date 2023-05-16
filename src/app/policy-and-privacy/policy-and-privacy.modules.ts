import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyAndPrivacyComponent } from './policy-and-privacy.component';
import { PolicyAndPrivacyRoutingModule } from './policy-and-privacy-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    PolicyAndPrivacyRoutingModule
  ],
  declarations: [PolicyAndPrivacyComponent],
})
export class PolicyAndPrivacyComponentModule {}
