import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { ClientSchedulePageRoutingModule } from './home-routing.module';
import { ModalNewScheduleComponent } from 'src/app/modalNewSchedule/modal-newSchedule.component';
import { ModalNewScheduleModule } from 'src/app/modalNewSchedule/modal-newSchedule.module';
import { CustomPipeModule } from 'src/app/customPipes/custom-pipes.module';

@NgModule({
  entryComponents: [ModalNewScheduleComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ClientSchedulePageRoutingModule,
    ModalNewScheduleModule,
    CustomPipeModule
  ],
  declarations: [HomePage]
})
export class ClientSchedulePageModule {}
