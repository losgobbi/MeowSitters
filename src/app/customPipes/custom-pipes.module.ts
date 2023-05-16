import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatsSplitCommaPipe } from './cats-split-comma.pipe'
import { FilterSchedulePipe } from './filter-schedule.pipe';

@NgModule({
    declarations: [CatsSplitCommaPipe, FilterSchedulePipe],
    imports: [
      IonicModule,
      CommonModule,
      FormsModule,
    ],
    exports: [CatsSplitCommaPipe, FilterSchedulePipe]
  })
  export class CustomPipeModule {}
  