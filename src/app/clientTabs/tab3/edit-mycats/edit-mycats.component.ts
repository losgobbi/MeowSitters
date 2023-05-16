import { Component, OnInit } from '@angular/core';
import { Cat } from 'src/app/models/Cat';
import { LoadingController, ActionSheetController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-edit-mycats',
  templateUrl: './edit-mycats.component.html',
})
export class EditMycatsComponent implements OnInit {
  private currentCatInfo: Cat;
  private catForm: FormGroup;
  private gender? : string;

  constructor (private authService : AuthService,
    private activatedRoute: ActivatedRoute,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    private router: Router,
    private alertController: AlertController,
    private backend: FirebaseService) {
  }

  ngOnInit() {
    let catObj = this.activatedRoute.snapshot.queryParams['cat'];
    this.currentCatInfo = JSON.parse(catObj);

    this.catForm = new FormGroup({
      name: new FormControl(this.currentCatInfo.name, [Validators.required]),
      birthdate: new FormControl(new Date(this.currentCatInfo.birthday).toISOString()),
    });

    if (this.currentCatInfo.gender)
      this.gender = this.currentCatInfo.gender;
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Quem é ' + this.catForm.get('name').value,
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

  async updateCat () {
    const loading = await this.loadingController.create({
      message: 'Atualizando dados...',
      spinner: "dots",
    });

    await loading.present();
    let isoDate = new Date(this.catForm.get('birthdate').value);

    // convert to epoch
    let catBirthdate = new Date(isoDate.getTime() + isoDate.getTimezoneOffset() * 60000);

    let newCatInfo: Cat;
    newCatInfo = { id : this.currentCatInfo.id };
    newCatInfo.name = this.catForm.get('name').value;
    newCatInfo.gender = this.gender;
    newCatInfo.birthday = catBirthdate;
   
    let updatedOk = await this.backend.updateCat(this.authService.getLoggedUser(), newCatInfo);
    loading.dismiss(); 

    if (!updatedOk) {
      const alert = await this.alertController.create({
        header: "Não foi possível atualizar os dados do seu cat, tente mais tarde!",
        buttons: [ 'OK' ]
      });
  
      await alert.present();
    } else {
      this.router.navigate(['/clientTabs/tab3'], { queryParams: { catUpdated: JSON.stringify(newCatInfo) } });
    }
  }
}
