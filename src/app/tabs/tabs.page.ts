import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  templateUrl: 'tabs.page.html',
})
export class TabsPage {
  constructor (public authService : AuthService) {}
}
