import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidatorsService } from 'src/app/customValidators/custom-validators.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  templateUrl: './change-login-password.component.html',
})
export class ChangeLoginPasswordComponentPage implements OnInit {
  private changePasswordForm: FormGroup;
  private containerPasswd: string = '';

  constructor (private modalCtrl: ModalController,
    private authService : AuthService,
    public loadingController: LoadingController,
    private customValidators: CustomValidatorsService,
    public alertController: AlertController,
    private backend: FirebaseService) {
  }

  ngOnInit() {
    this.changePasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required, 
        this.customValidators.checkIfPasswordIsTheSame(this.containerPasswd)]),
    });

    this.changePasswordForm.get('password').valueChanges.subscribe(val => {
      this.changePasswordForm.get('repeatPassword').setValue('');
    });

    this.changePasswordForm.get('password').valueChanges.subscribe(val => {
      this.containerPasswd = val;
      this.changePasswordForm.get('repeatPassword').
      setValidators([Validators.required, this.customValidators.checkIfPasswordIsTheSame(this.containerPasswd),
        this.customValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        this.customValidators.patternValidator(/.{8,}/, { hasMinimalLen: true })]);
    });
  }

  async changePassword () {
    const loading = await this.loadingController.create({
      message: 'Alterando senha do usuário...',
      spinner: "dots",
    });

    await loading.present();
    let client = this.authService.getLoggedUser();

    client.password = this.changePasswordForm.get('password').value;
    try {
      await this.authService.changeLoginPassword(this.changePasswordForm.get('password').value);
      
      client.changePassword = false;
      await this.backend.updateUser(client);
      loading.dismiss(); 

      // TODO need to logout/login again?
      // we are sure that is sitter for now
      this.authService.handleRedirect(client);

      setTimeout(_ => this.changePasswordForm.reset(), 2000);
    } catch (err) {
      loading.dismiss(); 

      await this.presentUpdatePasswordFailed();
      this.changePasswordForm.reset();
    }
  }

  async presentUpdatePasswordFailed() {
    const alert = await this.alertController.create({
      header: "Não foi possível atualizar a sua senha!",
      buttons: [ 'OK' ]
    });

    await alert.present();
  }
}
