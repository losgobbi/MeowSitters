import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'ion2-calendar';
import { ModalCalendarComponent } from './modal-calendar.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CalendarModule
  ],
  declarations: [ModalCalendarComponent],
  exports: [ModalCalendarComponent]
})
export class ModalCalendarModule {}
