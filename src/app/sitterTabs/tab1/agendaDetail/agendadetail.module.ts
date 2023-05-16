import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgendaDetailPage } from './agendadetail.page';
import { CustomPipeModule } from 'src/app/customPipes/custom-pipes.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CustomPipeModule
  ],
  declarations: [AgendaDetailPage]
})
export class AgendaDetailPageModule {}
