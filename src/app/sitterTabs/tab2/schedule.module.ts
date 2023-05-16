import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchedulePage } from './schedule.page';

import { SchedulePageRoutingModule } from './schedule-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SchedulePageRoutingModule
  ],
  declarations: [SchedulePage]
})
export class SchedulePageModule {}
