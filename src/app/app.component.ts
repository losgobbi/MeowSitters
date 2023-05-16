import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FirebaseService } from './services/firebase.service';
import { ConfigService } from './services/config.service';
import { AuthService } from './services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private firebase: FirebaseService,
    private config: ConfigService,
    private authService: AuthService) {
    this.initializeApp();
  }
  
  storeInit() {}

  initializeApp() {
   if (environment.production)
    this.splashScreen.show();    
    this.platform.ready().then(async () => {
      let loggedUser;
      try {
        let cfg = await this.firebase.getConfig();
        this.config.init(cfg);  
        loggedUser = await this.authService.isUserAuthenticated();
      } catch(error) {
        console.log(error); 
      }

      if (this.platform.is('cordova'))
        this.storeInit();
      if (loggedUser)
        this.authService.handleRedirect(loggedUser);
    });
  }
}
