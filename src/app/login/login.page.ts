import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  templateUrl: 'login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  loginForm: FormGroup;
  option: string = "none";

  constructor (private router: Router,
    public authService : AuthService,
    public alertController: AlertController,
    public loadingController: LoadingController) {
  }

  ngOnInit () {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async processLogin () {
    const loading = await this.loadingController.create({
      message: 'Autenticando usuário...',
      spinner: "dots",
    });

    await loading.present();
    let user = await this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value);
    loading.dismiss(); 

    if (user) {
      this.authService.handleRedirect(user);
    } else {
      this.presentLoginFailed();
    }

    setTimeout(() => {
      this.loginForm.reset();
    }, 1000); 
  }

  async presentLoginFailed() {
    const alert = await this.alertController.create({
      header: "Não foi possível logar neste usuário!",
      buttons: [ 'OK' ]
    });

    await alert.present();
  }

  registerLogin() {
    this.router.navigate(['login/register', this.loginForm.get('email').value, this.loginForm.get('password').value]);
  }

  handleOption(option: string) {
    this.option = option;
  }
}
