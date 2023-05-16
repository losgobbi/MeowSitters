import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from 'src/app/models/Login';

@Component({
  templateUrl: 'client.page.html',
})
export class ClientPage implements OnInit {
  private login: Login;

  constructor (public authService : AuthService) {
  }

  ngOnInit() {
    this.login = this.authService.getLoggedUser();
  }

  formatAddress() : string {
    let addr = "";

    addr += this.login.info.addr.street;
    if (this.login.info.addr.streetcompl.length > 0) {
      addr += "<br>";
      addr += this.login.info.addr.streetnumber + "<br>";
      addr += this.login.info.addr.streetcompl + "<br>";
    } else {
      addr += " " + this.login.info.addr.streetnumber + "<br>";
    } 
    
    addr += this.login.info.addr.neighborhood + "<br>";
    addr += this.login.info.addr.city + " | " + this.login.info.addr.state + "<br>";
    addr += this.login.info.addr.cep + "<br>";
    return addr;
  }
}
