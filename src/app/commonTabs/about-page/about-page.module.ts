import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutPageComponent } from './about-page.component';
import { AboutPageRoutingModule } from './about-page-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [AboutPageComponent],
  imports: [
    IonicModule,
    CommonModule,
    AboutPageRoutingModule,
    CommonModule
  ]
})
export class AboutPageModule { }
