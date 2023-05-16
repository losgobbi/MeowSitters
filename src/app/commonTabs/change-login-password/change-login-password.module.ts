import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeLoginPasswordComponentPage } from './change-login-password.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ChangeLoginPasswordComponentPage]
})
export class ChangeLoginPasswordModule {}
