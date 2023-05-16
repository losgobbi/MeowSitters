import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Cat } from 'src/app/models/Cat';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-register-cat',
  templateUrl: './register-cat.component.html',
})
export class RegisterCatComponent implements OnInit {
  private registerCat: FormGroup;
  private gender? : string;

  constructor(private modalController: ModalController,
    public actionSheetController: ActionSheetController,
    private authService : AuthService,
    private backend: FirebaseService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.registerCat = new FormGroup({
      name: new FormControl('', [Validators.required]),
      birthdate: new FormControl('', [Validators.required]),
    });
  }

  dismissModal () {
    this.modalController.dismiss();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Quem é ' + this.registerCat.get('name').value,
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Gatinho',
        handler: () => {
          this.gender = 'Gatinho';
        }
      }, {
        text: 'Gatinha',
        handler: () => {
          this.gender = 'Gatinha';
        }
      }]
    });
    await actionSheet.present();
  }

  async processForm () {
    // convert to epoch
    let utcDate = new Date(this.registerCat.get('birthdate').value);
    let catBirthdate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);

    let newCat : Cat = {};
    newCat.name = this.registerCat.get('name').value;
    newCat.gender = this.gender;
    newCat.birthday = catBirthdate;
    let addOk = await this.backend.addCat(this.authService.getLoggedUser(), newCat);
    if (!addOk) {
      const alert = await this.alertController.create({
        header: "Não foi possível criar o seu cat, tente mais tarde!",
        buttons: [ 'OK' ]
      });
  
      await alert.present();
    } else {
      this.modalController.dismiss({ catUpdated: JSON.stringify(newCat) });
    }
  }
}
