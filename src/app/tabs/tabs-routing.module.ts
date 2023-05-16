import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthService } from '../services/auth.service';
import { LoginPage } from '../login/login.page';
import { RegisterPage } from '../commonTabs/register-user/register.page';
import { ChangeLoginPasswordComponentPage } from '../commonTabs/change-login-password/change-login-password.component';
import { PolicyAndPrivacyComponent } from '../policy-and-privacy/policy-and-privacy.component';

const routes: Routes = [
  {
    path: 'sitterTabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../sitterTabs/tab1/agenda.module').then(m => m.AgendaPageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../sitterTabs/tab2/schedule.module').then(m => m.SchedulePageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../sitterTabs/tab3/manage.module').then(m => m.ManagePageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('../commonTabs/about-page/about-page.module').then(m => m.AboutPageModule)
      },
      {
        path: '',
        redirectTo: '/sitterTabs/tab1',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: '/sitterTabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'clientTabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../clientTabs/tab1/home.module').then(m => m.ClientSchedulePageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../clientTabs/tab2/client.module').then(m => m.ClientPageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../clientTabs/tab3/mycats.module').then(m => m.ClientCatsPageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('../commonTabs/about-page/about-page.module').then(m => m.AboutPageModule)
      },
      {
        path: '',
        redirectTo: '/clientTabs/tab1',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: '/clientTabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'login/register/:email/:password',
    component: RegisterPage,
    pathMatch: 'full'
  },
  {
    path: 'login/changePassword/:email',
    component: ChangeLoginPasswordComponentPage,
    pathMatch: 'full'
  },
  {
    path: 'policy',
    component: PolicyAndPrivacyComponent,
    pathMatch: 'full'

  },
  {
    path: '',
    component: LoginPage,
    pathMatch: 'full',
  },
  {
    path: '**',
    component: LoginPage,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {
}
