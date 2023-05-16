import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'ion2-calendar';
import { RegisterCatComponent } from './register-cat.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
  ],
  declarations: [RegisterCatComponent],
  exports: [RegisterCatComponent]
})
export class RegisterCatModule {
  constructor () {
  }
}
