import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './login.page';
import { LoginPageRoutingModule } from './login-routing.module';
import { RegisterPageModule } from '../commonTabs/register-user/register.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginPageRoutingModule,
    RegisterPageModule
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {}
