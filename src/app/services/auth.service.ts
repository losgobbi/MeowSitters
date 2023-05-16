import { Injectable, OnInit } from "@angular/core";
import { Login } from '../models/Login';
import { FirebaseService } from './firebase.service';
import { ConfigService } from './config.service';
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
  private loggedUser: Login;
  private checkingSession: boolean = true;

  constructor (private backend: FirebaseService,
    private config : ConfigService,
    private router: Router) {
  }

  async login(login: string, password: string) : Promise<Login> {
    this.loggedUser = await this.backend.login(login, password);
    if (this.loggedUser) {
      if (!this.loggedUser.activated)
        return null;

      if (this.config.getDisablePlatform() == true)
        return null;
    }

    // TODO review the newSchedule tmp
    return this.loggedUser;
  }

  async logout() {
    this.loggedUser = null;
    await this.backend.logout();
  }

  async changeLoginPassword(password) {
    await this.backend.changeLoginPassword(password);
  }

  async isUserAuthenticated() : Promise<Login> {
    if (this.config.getDisablePlatform() == true) {
      this.checkingSession = false;
      return null;
    }

    this.loggedUser = await this.backend.getLoggedUser();
    this.checkingSession = false;
    return this.loggedUser;
  }

  getLoggedUser(): Login {
    return this.loggedUser;
  }

  handleRedirect(user: Login) {
    if (user.changePassword) {
      this.router.navigate(['/login/changePassword', user.login]);
    } else {
      if (!user.consent)
        this.router.navigate(['/policy']);
      else if (user.isRoleSitter)
        this.router.navigate(['/sitterTabs']);
      else
        this.router.navigate(['/clientTabs']);
    }
  }
}
