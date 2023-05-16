import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCatsPage } from './mycats.page';
import { EditMycatsComponent } from './edit-mycats/edit-mycats.component';

const routes: Routes = [
  {
    path: '',
    component: MyCatsPage
  },
  {
    path: 'cat_detail',
    component: EditMycatsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientCatsPageRoutingModule {}
