import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientPage } from './client.page';
import { ClientPageRoutingModule } from './client-routing.module';

@NgModule({
  entryComponents: [],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ClientPageRoutingModule,
  ],
  declarations: [ClientPage]
})
export class ClientPageModule {}
