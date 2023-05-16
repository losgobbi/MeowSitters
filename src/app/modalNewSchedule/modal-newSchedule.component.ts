import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavController, AlertController, IonButton, LoadingController, ActionSheetController, NavParams } from '@ionic/angular';
import { SitterCompany } from '../models/SitterCompany';
import { AuthService } from '../services/auth.service';
import { ModalCalendarComponent } from '../modalCalendar/modal-calendar.component';
import { Schedule, WAITING_INFO } from '../models/Schedule';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-newSchedule.component.html',
})
export class ModalNewScheduleComponent implements OnInit {
  public newSchedule: Schedule = {};
  private companies: Promise<Array<SitterCompany>>;
  private searchMode: boolean = true;
  private orderMode: boolean = false;

  constructor(private modalController: ModalController,
    private nav: NavController,
    protected alertController: AlertController,
    public authService : AuthService,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    private backend: FirebaseService,
    private params: NavParams) { 
      this.newSchedule.client = authService.getLoggedUser();
      this.newSchedule.status = 0;
      if (params.get('modalMode') === 'add') {
        this.searchMode = false;
      }
  }

  ngOnInit() {
    this.fetchCompanies();
  }

  async fetchCompanies() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Aguarde, carregando...',
      spinner: "dots",
    });

    await loading.present();
    this.companies = this.backend.getCompanies(this.authService.getLoggedUser().info.addr);
    this.companies.then(companies => {
      companies.forEach(company => { 
        company.visible = true 
      })
    })
    loading.dismiss();
  }

  dismissModal () {
    this.newSchedule = { client: this.authService.getLoggedUser(), status: 0 };
    this.modalController.dismiss();
  }

  showDetail () {
    this.nav.navigateForward(["/sitterTabs"]);
  }

  async chooseDate (id : string) {
    const modal = await this.modalController.create({ component: ModalCalendarComponent, componentProps: { viewSrc: id} });
    await modal.present();

    modal.onDidDismiss().then((returned) => {
      // no selection
      if (!returned.data.dateValue)
        return;

      if (id === 'singleDate') {
        this.newSchedule.returnDate = returned.data.dateValue;
        let now = new Date();

        this.newSchedule.returnDate.setHours(now.getHours());
        this.newSchedule.returnDate.setMinutes(now.getMinutes());
        this.newSchedule.returnDate.setSeconds(now.getSeconds());  
      } else {
        this.newSchedule.travelDate = returned.data.dateValue;  
        this.newSchedule.travelDate.forEach(date => { 
          let now = new Date();
          date.setHours(now.getHours());
          date.setMinutes(now.getMinutes());
          date.setSeconds(now.getSeconds());
        })
  
        this.newSchedule.travelDate.sort((dateA, dateB) => { return dateA.getTime() - dateB.getTime() } );
      }
    });
  }

  async presentAlertConfirm () {
    const msg = 'Deseja confirmar o agendamento?';
    const alert = await this.alertController.create({
      header: msg,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            alert.dismiss()
          }
        }, {
          text: 'SIM',
          handler: () => {
            return this.newSchedule;
          }
        }
      ]
    });

    await alert.present();
    alert.onDidDismiss().then((data) => {     
      if (data.role !== 'cancel') {
        this.addClientSchedule();
      } else {
        this.newSchedule = { client: this.authService.getLoggedUser(), status: 0 };
        this.modalController.dismiss(data.data);
      }
    });
  }

  async addClientSchedule() {
    const loading = await this.loadingController.create({
      message: 'Criando agendamento...',
      spinner: "dots",
    });

    await loading.present();
    this.newSchedule.createDate = new Date();
    if (this.newSchedule.status != WAITING_INFO)
      this.newSchedule.scheduleValue = this.newSchedule.company.dailyValue * this.newSchedule.travelDate.length;
    let initialSchedule = await this.backend.addSchedule(this.authService.getLoggedUser(), this.newSchedule, true);
    loading.dismiss();

    if (!initialSchedule) {
      const alert = await this.alertController.create({
        header: "Não foi possível criar o agendamento, tente mais tarde!",
        buttons: [ 'OK' ]
      });
  
      await alert.present();
    } else {
      this.modalController.dismiss(this.newSchedule);
    }
  }

  setCompany (company: SitterCompany, btnCompany: IonButton) {
    if (btnCompany.color == "success") {
      this.newSchedule.company = undefined;
      // reset everything
      this.newSchedule = { client: this.authService.getLoggedUser(), status: 0 };
      btnCompany.color = "light";
      this.companies.then(companies => companies.forEach(company => company.visible = true))
      this.orderMode = false;
    } else {
      this.newSchedule.company = company;
      btnCompany.color = "success";
      this.companies.then(companies => 
        companies.forEach(companyIter => {
          if (companyIter.id != company.id)
             companyIter.visible = false
        }))

      if (this.newSchedule.company.isMinimalValue)
        this.orderMode = true;
    }
  }

  checkSchedule (section: string) : Boolean {
    if (section === 'header' && this.newSchedule.company) {
      return true;
    }

    if (section === 'company' && this.newSchedule.company) {
      return true;
    }
    
    if (section === 'travelDate' && this.newSchedule.travelDate) {
      return true;
    }

    if (section === 'returnDate' && this.newSchedule.returnDate) {
      return true;
    }

    if (section === 'price' && this.newSchedule.travelDate) {
      if (this.newSchedule.company && !this.newSchedule.company.isMinimalValue)
        return true;

      return false;
    }

    if (section === 'keys' && this.newSchedule.howToReturnKey) {
      return true;
    }

    if (section === 'btn') {
      if (this.newSchedule.company && this.newSchedule.travelDate && this.newSchedule.returnDate && this.newSchedule.howToReturnKey)
        return true;
    }

    return false;
  }

  async chooseHowToReturnKey() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Informe devolução da chave:',
      buttons: [{
        text: 'Deixar na portaria',
        handler: () => {
          this.newSchedule.howToReturnKey = 'Deixar na portaria';
        }
      }, {
        text: 'Pegar com a sitter',
        handler: () => {
          this.newSchedule.howToReturnKey = 'Pegar com a sitter';
        }
      },
      {
        text: 'Deixar a chave dentro da localidade',
        handler: () => {
          this.newSchedule.howToReturnKey = 'Deixar a chave dentro da localidade';
        }
      }]
    });
    await actionSheet.present();
  }
}
