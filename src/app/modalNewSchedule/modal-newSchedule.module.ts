import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'ion2-calendar';
import { ModalNewScheduleComponent } from './modal-newSchedule.component';
import { ModalCalendarModule } from '../modalCalendar/modal-calendar.module';
import { ModalCalendarComponent } from '../modalCalendar/modal-calendar.component';

@NgModule({
  entryComponents: [ModalCalendarComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CalendarModule,
    ModalCalendarModule
  ],
  declarations: [ModalNewScheduleComponent],
  exports: [ModalNewScheduleComponent]
})
export class ModalNewScheduleModule {}
