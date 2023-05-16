import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { TitleCasePipe } from '@angular/common';
import { CustomValidatorsService } from './customValidators/custom-validators.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirebaseService } from './services/firebase.service';
import { LocalStorageService } from './services/localstorage.service';
import { IonicStorageModule } from '@ionic/storage';
import { InAppPurchase2 } from '@ionic-native/in-app-purchase-2/ngx';
import { AdsService } from './services/ads.service';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { ConfigService } from './services/config.service';
import { AES256 } from '@ionic-native/aes-256/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    TitleCasePipe,
    CustomValidatorsService,
    AngularFirestore,
    AngularFireAuth,
    FirebaseService,
    LocalStorageService,
    InAppPurchase2,
    AdMobFree,
    AdsService,
    AES256,
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
