import { Component, ViewChild } from '@angular/core';
import { IonReorderGroup, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Schedule } from 'src/app/models/Schedule';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-schedule',
  templateUrl: 'schedule.page.html',
})
export class SchedulePage {
  @ViewChild(IonReorderGroup, { static: true }) reorderGroup: IonReorderGroup;
  currentDate: Date;
  dailySchedules: Array<Schedule> = [];
  disablesave: boolean = true;
  dailyKeys = [];

  constructor (private alertController: AlertController,
    private authService: AuthService,
    private localStorage: LocalStorageService,
    private loadingController: LoadingController) {
      // curret date for filter
      this.currentDate = new Date();
      this.fetchDailySchedule();
  }

  async fetchDailySchedule() {

    for (let i = 0; i < this.dailyKeys.length; i++) {
      let jsonSchedule = await this.localStorage.get(this.dailyKeys[i] + "-" + this.authService.getLoggedUser().id);

      if (!jsonSchedule) {
        break;
      }

      let schedule : Schedule = JSON.parse(jsonSchedule);
        
      let travelDate = schedule.travelDate.map(date => new Date(date));
      schedule.travelDate = travelDate;

      // if we share the same device for different users
      if (schedule.sitter.login != this.authService.getLoggedUser().login)
        break;

      this.dailySchedules.push(schedule);
    }
  }

  doReorder (ev: any) {
    this.disablesave = false;

    let fromIdx = ev.detail.from - 1;
    let toIdx = ev.detail.to - 1;
    
    let fromSchedule = this.dailySchedules[fromIdx];
    let oldToSchedule = this.dailySchedules[toIdx];

    this.dailySchedules[toIdx] = fromSchedule;
    this.dailySchedules[fromIdx] = oldToSchedule;
    ev.detail.complete();
  }

  updateDailySchedules(event) {
    this.dailySchedules = [];
    this.fetchDailySchedule();

    setTimeout(_ => { 
      event.target.complete();
    }, 1000);
  }

  async presentAlertConfirm (schedule: Schedule) {
    const msg = 'Deseja confirmar horário de visita de ' + schedule.client.name;
    const alert = await this.alertController.create({
      header: msg,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'SIM',
        }
      ]
    });

    await alert.present();
  }

  isScheduleConfirmed (schedule: Schedule) : boolean {
    return false;
  }

  canReorderSchedule (schedule: Schedule) : boolean {
    return true;
  }

  async saveSchedule () {

    this.disablesave = true;
    const loading = await this.loadingController.create({
      message: 'Salvando roteiro diário...',
      spinner: "dots",
    });

    await loading.present();

    for (let i = 0; i < this.dailySchedules.length; i++) {
      let schedule = this.dailySchedules[i];
      if (!schedule)
        break;

      await this.localStorage.delete(this.dailyKeys[i] + "-" + this.authService.getLoggedUser().id);

      await this.localStorage.set(this.dailyKeys[i] + "-" + this.authService.getLoggedUser().id, JSON.stringify(schedule));
    }

    await loading.dismiss();

    const msg = 'Relatório:';
    const alert = await this.alertController.create({
      header: msg,
      message: 'Sua programação para hoje foi salva.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
