import { Injectable } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AdsService {
  
  bannerConfig: AdMobFreeBannerConfig = {
    isTesting: true,
    id: "",
    };

  interstitialConfig: AdMobFreeInterstitialConfig = {
    isTesting: true,
    id: ""
  };

  RewardVideoConfig: AdMobFreeRewardVideoConfig = {
    isTesting: true,
    autoShow: false
  };
    
  constructor(
    public platform: Platform,
    private admobFree: AdMobFree) {
      platform.ready().then(() => {
        this.admobFree.banner.config(this.bannerConfig);
        this.admobFree.interstitial.config(this.interstitialConfig);
    });
  }

  showBanner() {
    this.admobFree.banner.prepare().then(() => {
      this.admobFree.banner.show().then(() => {
        console.log("banner show ok");
      })
    })
  }

  showInterstitial() {
    this.admobFree.interstitial.prepare().then(() => {
      console.log('interstitial ok');
    })
  }  
}
