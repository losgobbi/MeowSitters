import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Schedule, REQUEST_CANCEL, PENDING, CONFIRMED, DONE, INFO_DONE, WAITING_INFO, NOT_DONE, CANCELED, FORWARDED } from 'src/app/models/Schedule';
import { AuthService } from 'src/app/services/auth.service';
import { ModalNewScheduleComponent } from 'src/app/modalNewSchedule/modal-newSchedule.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { environment } from 'src/environments/environment';
import { isPast } from 'date-fns'
import { LocalStorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
})
export class HomePage implements OnInit {
  private schedules: Promise<Array<Schedule>>;
  private schedulesCache: Array<Schedule> = [];
  private assetsNumber: String;

  constructor (private modalCtrl: ModalController,
    private router: Router,
    public authService : AuthService,
    private backend: FirebaseService,
    private localStorage: LocalStorageService) {
      this.schedules = this.fetchSchedules();
      this.assetsNumber = environment.assetSet;
  }
  
  ngOnInit(): void {
    this.schedules.then(async schedule => {
      // reorder
      schedule.sort((schA, schB) => {
        return schB.createDate.getTime() - schA.createDate.getTime();
      });
    })
  }

  updateOldSchedulesStatus(schedules: Array<Schedule>) {
    let update = false;
    schedules.forEach(async schedule => {
      let old = isPast(schedule.returnDate);
      if (old && schedule.status == CONFIRMED) {
        schedule.status = DONE;
        update = true;
      } else if (old && (schedule.status == REQUEST_CANCEL || schedule.status == WAITING_INFO 
        || schedule.status == INFO_DONE || schedule.status == CANCELED || schedule.status == FORWARDED || schedule.status == PENDING)) {
        schedule.status = NOT_DONE;
        update = true;
      }

      if (update) {
        await this.backend.addSchedule(this.authService.getLoggedUser(), schedule, false);
      }
    })
  }

  async manageCache(schedules: Array<Schedule>) {}

  async createModal (mode: string) {
    const modal = await this.modalCtrl.create({ component: ModalNewScheduleComponent, componentProps: { modalMode: mode }} );

    modal.onDidDismiss().then(dismissData => {
      if (!dismissData.data)
        return;

      let newSchedule = dismissData.data as Schedule;     
      if (newSchedule) {
        // build data without download again in the new schedule flow
        let currentData : Array<Schedule> = [];
        this.schedules.then(result => {
          currentData.push(newSchedule);

          for (let i = 0; i < result.length; i++) {
            currentData.push(result[i]);
          }

          this.schedules = new Promise((resolve) => resolve(currentData));
        })
      }      
    })
    await modal.present();
  }

  async fetchSchedules() : Promise<Array<Schedule>> {
    let statusFilter = DONE + 1; // fetch all
    
    return this.backend.fetchSchedules(this.authService.getLoggedUser(), statusFilter);
  }

  updateClientSchedules (event) {
    setTimeout(_ => { 
      event.target.complete();
    }, 1000);
    this.schedules = undefined;
    this.schedules = this.fetchSchedules();
    
    this.schedules.then(schedule => {
        // reorder
        schedule.sort((schA, schB) => {
          return schB.createDate.getTime() - schA.createDate.getTime();
        });      
    })
  }

  logout()  {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
