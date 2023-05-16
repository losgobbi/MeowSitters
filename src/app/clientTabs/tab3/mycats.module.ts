import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyCatsPage } from './mycats.page';
import { ClientCatsPageRoutingModule } from './mycats-routing.module';
import { EditMycatsModule } from './edit-mycats/edit-mycats.module';
import { RegisterCatComponent } from './register-cat/register-cat.component';
import { RegisterCatModule } from './register-cat/register-cat.module';

@NgModule({
  entryComponents: [RegisterCatComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ClientCatsPageRoutingModule,
    RegisterCatModule,
    EditMycatsModule
  ],
  declarations: [MyCatsPage]
})
export class ClientCatsPageModule {}
