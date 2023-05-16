import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgendaPage } from './agenda.page';

import { AgendaPageRoutingModule } from './agenda-routing.module';
import { CustomPipeModule } from 'src/app/customPipes/custom-pipes.module';
import { AgendaDetailPageModule } from './agendaDetail/agendadetail.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AgendaPageRoutingModule,
    CustomPipeModule,
    AgendaDetailPageModule
  ],
  declarations: [AgendaPage]
})
export class AgendaPageModule {}
