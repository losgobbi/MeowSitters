import { IonicModule } from '@ionic/angular';
import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.page';
import { LoginPageModule } from '../login/login.module';
import { ClientSchedulePageModule } from '../clientTabs/tab1/home.module';
import { ClientCatsPageModule } from '../clientTabs/tab3/mycats.module';
import { ChangeLoginPasswordModule } from '../commonTabs/change-login-password/change-login-password.module';
import { LocalStorageService } from '../services/localstorage.service';
import { environment } from 'src/environments/environment';
import { ClientPageModule } from '../clientTabs/tab2/client.module';
import { PolicyAndPrivacyComponentModule } from '../policy-and-privacy/policy-and-privacy.modules';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    LoginPageModule,
    ClientSchedulePageModule,
    ClientCatsPageModule,
    ChangeLoginPasswordModule,
    ClientPageModule,
    PolicyAndPrivacyComponentModule
  ],
  declarations: [TabsPage],
})
export class TabsPageModule {
  constructor (private localstorage: LocalStorageService) {
    this.getAssetsSet();
  }

  async getAssetsSet() {
    let imgset = await this.localstorage.get('assetsSet');
    let assetNumber = Math.floor(Math.random() * 4) + 1;
    // save it
    if (!imgset) {
      await this.localstorage.set("assetsSet", assetNumber);
      environment.assetSet = assetNumber+"";
    } else {
      environment.assetSet = imgset+"";
    }
  }
}
