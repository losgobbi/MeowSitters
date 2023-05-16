import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Login } from 'src/app/models/Login';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { InAppPurchase2 } from '@ionic-native/in-app-purchase-2/ngx';

@Component({
  templateUrl: 'employee.page.html'
})
export class EmployeePage {
  private action : string = '';
  private registerDailyRate : Boolean = false;
  private queryReport : Boolean = false;
  private enableRegisterForm : Boolean = false;
  private manageRegistration : Boolean = false;
  private editPlan : Boolean = false;
  private registerPet : Boolean = false;
  private registerForm: FormGroup;
  private updateDailyForm: FormGroup;
  private login: Login;
  private logins : Promise<Array<Login>>;

  constructor (private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    public authService : AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private backend: FirebaseService) {}

  ngOnInit () {
    this.action = this.activatedRoute.snapshot.params.action;
    this.login = this.authService.getLoggedUser();

    if (this.action === 'register_daily_rate') {
      this.registerDailyRate = true;

      this.updateDailyForm = new FormGroup({
        dailyValue: new FormControl('', [Validators.required]),
        isMinimalValue: new FormControl(this.authService.getLoggedUser().info.company.isMinimalValue)
      });
    } else if (this.action === 'query_report') {
      this.queryReport = true;
    } else if (this.action === 'register') {
      this.enableRegisterForm = true;

      this.registerForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
      });

    } else if (this.action === 'manage_registration') {
      this.manageRegistration = true;
      this.logins = this.backend.getCompanyUsers(this.authService.getLoggedUser(), false);
    } else if (this.action === 'edit_plan') {
      this.editPlan = true;
    }
  }

  async presentLoginStateConfirmation (sitter : Login) {
    let msg: string;
    if (sitter.activated) {
      msg = 'Deseja desativar o cadastro de ' + sitter.name + '?';
    } else {
      msg = 'Deseja ativar o cadastro de ' + sitter.name + '?';
    }
    const alert = await this.alertController.create({
      header: msg,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Confirmar',
          handler: () => {
            this.changeLoginState(sitter);
          }
        }
      ]
    });

    await alert.present();
  }

  getColorByLoginState(login: Login) {
    if (login.activated)
      return "success";
    else
      return "sitters";
  }

  async changeLoginState(login: Login) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Aguarde, alterando o status do usuário...',
      spinner: "dots",
    });

    await loading.present();
    login.activated = !login.activated;
    await this.backend.updateUser(login);
    loading.dismiss();

    const alert = await this.alertController.create({
      header: "Usuário ativado, em breve ele estará acessível!",
      buttons: [ 'OK' ]
    });

    await alert.present();
  }


  async processDailyRate() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Aguarde, alterando o valor da diária...',
      spinner: "dots",
    });

    await loading.present();
    
    let oldDailyValule = this.authService.getLoggedUser().info.company.dailyValue;
    let oldMinValue = this.authService.getLoggedUser().info.company.isMinimalValue;

    let newDaily = this.updateDailyForm.get('dailyValue').value;
    let isMinimal = this.updateDailyForm.get('isMinimalValue').value;

    this.authService.getLoggedUser().info.company.dailyValue = newDaily;
    this.authService.getLoggedUser().info.company.isMinimalValue = isMinimal;
    let updated = await this.backend.updateCompany(this.authService.getLoggedUser().info.company);
    loading.dismiss();

    if (updated) {
      const alert = await this.alertController.create({
        header: "Valor atualizado com sucesso!",
        buttons: [ 'OK' ]
      });
  
      await alert.present();
    } else {
      this.authService.getLoggedUser().info.company.dailyValue = oldDailyValule;
      this.authService.getLoggedUser().info.company.isMinimalValue = oldMinValue;
      const alert = await this.alertController.create({
        header: "Não foi possível atualizar o valor!",
        buttons: [ 'OK' ]
      });
  
      await alert.present();
    }

    this.router.navigate(["/sitterTabs/tab3"]);
  }

  processQueryReport() {

  }

  async processRegister () {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Aguarde, registrando usuário...',
      spinner: "dots",
    });

    await loading.present();

    let newSitter: Login = {};

    newSitter.name = this.registerForm.get('name').value;
    newSitter.login = this.registerForm.get('email').value;
    newSitter.password = this.registerForm.get('password').value;
    newSitter.activated = false;
    newSitter.type = 1;
    newSitter.changePassword = true;

    newSitter.info = {};
    newSitter.info.company = this.authService.getLoggedUser().info.company;

    let res = await this.backend.addUser(newSitter);
    loading.dismiss();

    if (res) {
      const alert = await this.alertController.create({
        header: "Cadastro criada com sucesso!",
        buttons: [
          {
            text: 'Confirmar',
            handler: () => {
              this.router.navigate(["/sitterTabs/tab3"]);
            }
          }
        ]
      });
  
      await alert.present();
    } else {
      await this.presentRegisterFailed();
    }
  }

  async presentRegisterFailed() {
    const alert = await this.alertController.create({
      header: "Não foi possível cadastrar esse usuário!",
      buttons: [ {
        text: 'OK',
        handler: () => {
          this.registerForm.reset();
        }
      } ]
    });

    await alert.present();
  }
}
