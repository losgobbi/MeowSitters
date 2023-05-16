import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaPage } from './agenda.page';
import { AgendaDetailPage } from './agendaDetail/agendadetail.page';

const routes: Routes = [
  {
    path: '',
    component: AgendaPage,
  },
  {
    path: 'agenda_detail',
    component: AgendaDetailPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaPageRoutingModule {}
