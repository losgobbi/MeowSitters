import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Login } from 'src/app/models/Login';
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidatorsService } from 'src/app/customValidators/custom-validators.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import cep from 'cep-promise'
import { Addr } from 'src/app/models/Addr';

@Component({
  templateUrl: './register.page.html',
})
export class RegisterPage implements OnInit {
  private registerForm: FormGroup;
  private login: Login = {};
  private fetchedCEP: boolean = false;
  private addr : Addr = {};

  constructor(private activatedRoute: ActivatedRoute,
    public loadingController: LoadingController,
    private router: Router,
    private authService: AuthService,
    public alertController: AlertController,
    private customValidators: CustomValidatorsService,
    private backend: FirebaseService) { }

  ngOnInit() {
    let email = this.activatedRoute.snapshot.params.email;
    let password = this.activatedRoute.snapshot.params.password;

    this.login = { login: email, password: password, activated : true, type : 2, changePassword: false};
    this.login.info = { cats: [] };

    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      verifypassword: new FormControl('', 
        [Validators.required, 
            this.customValidators.checkIfPasswordIsTheSame(password), 
            this.customValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
            this.customValidators.patternValidator(/.{8,}/, { hasMinimalLen: true })]),
      cep: new FormControl('', [Validators.required]),
      addrnumber: new FormControl('', [Validators.required]),
      addrcompl: new FormControl(''),
    });

    this.registerForm.controls['cep'].valueChanges.subscribe(value => {
      if (!value)
        return;
      let cepLen = value.toString().length;
      if (cepLen == 8) {
        cep(value)
        .then(object => {
          this.addr.cep = object.cep;
          this.addr.city = object.city;
          this.addr.neighborhood = object.neighborhood;
          this.addr.state = object.state;
          this.addr.street = object.street;
          this.fetchedCEP = true;
        }).catch(error => {
          console.log(error);
        })
      } else if (cepLen < 8) {
        this.fetchedCEP = false;
        this.addr = {};
      }
    });
  }

  async finishRegister() {
    this.login.name = this.registerForm.get('name').value;
    this.addr.streetcompl = this.registerForm.get('addrcompl').value;
    this.addr.streetnumber = this.registerForm.get('addrnumber').value;

    this.login.info.addr = this.addr;
    const loading = await this.loadingController.create({
      message: 'Registrando usuário...',
      spinner: "dots",
    });

    await loading.present();

    let user = await this.backend.addUser(this.login);

    loading.dismiss();

    if (user) {
      this.presentAlert("Aguarde ativarmos o seu usuário. Obrigado!")
    } else {
      this.presentAlert("Não foi possível registrar esse usuário, tente mais tarde!");
    }
  }

  async presentAlert(msg: string) {
    this.registerForm.reset();

    const alert = await this.alertController.create({
      header: msg,
      buttons: [ {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/login']);
          }
        } 
      ]
    });

    await alert.present();
  }

  dismiss() {
    this.router.navigate(['/login']);
  }
}
