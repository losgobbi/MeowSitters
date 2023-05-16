import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ConfigService } from '../services/config.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-policy-and-privacy',
  templateUrl: './policy-and-privacy.component.html',
})
export class PolicyAndPrivacyComponent {
  consenting: boolean = false;

  constructor(private router: Router,
     private backend: FirebaseService,
     public auth: AuthService,
     public config: ConfigService) { }

  async accept() {
    this.consenting = true;
    let user = this.auth.getLoggedUser();
    user.consent = true;
    this.auth.handleRedirect(user);

    // if it fails, over the next login will trigger again
    await this.backend.updateUser(user);
    this.consenting = false;
  }
}
