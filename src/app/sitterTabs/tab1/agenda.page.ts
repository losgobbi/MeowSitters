import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Schedule, PENDING, CANCELED, CONFIRMED, FORWARDED, DONE, WAITING_INFO, INFO_DONE, REQUEST_CANCEL, NOT_DONE } from 'src/app/models/Schedule';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { isPast, isToday } from 'date-fns'
import { environment } from 'src/environments/environment';
import { InAppPurchase2 } from '@ionic-native/in-app-purchase-2/ngx';
import { AdsService } from 'src/app/services/ads.service';

@Component({
  templateUrl: 'agenda.page.html',
})

export class AgendaPage implements OnInit {
  private schedules: Promise<Array<Schedule>>;
  private assetsNumber: String;
  private filterSegment = CONFIRMED;
  private schedulesCache: Array<Schedule> = [];
  private triggerBanner = 0;
  private triggerInter = 0;

  constructor (public authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private backend: FirebaseService,
    private localStorage: LocalStorageService,
    private store: InAppPurchase2,
    private admobService: AdsService) {
      this.schedules = this.fetchSchedules();
      this.assetsNumber = environment.assetSet;
  }

  logout()  {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  async fetchSchedules() : Promise<Array<Schedule>> {
    let statusFilter = DONE + 1; // fetch all
    return this.backend.fetchSchedules(this.authService.getLoggedUser(), statusFilter);
  }

  async manageCache(schedules: Array<Schedule>) {
  }

  ngOnInit() {    
    this.schedules.then(async schedule => {
      let dailySchedules = schedule.filter(scheduleEntry => {       
        // only confirmed and for me for daily report
        if (scheduleEntry.status != CONFIRMED || scheduleEntry.sitter.login != this.authService.getLoggedUser().login)
          return false;
        
        let _matchDate = false;
        let currentDate = new Date();
        scheduleEntry.travelDate.forEach(scheduleDate => {
          if (isToday(scheduleDate)) {
            _matchDate = true;
          }
        })
        
        return _matchDate;
      });

      this.manageCache(schedule);
      this.updateOldSchedulesStatus(schedule);
      this.updateDailyReport(dailySchedules);    
    });


    this.activatedRoute.queryParams.subscribe(val => {
      let scheduleObj = val['scheduleUpdated'];
      if (scheduleObj) {
        let detail : Schedule = JSON.parse(scheduleObj);
        detail.travelDate = detail.travelDate.map(date => new Date(date));
        detail.returnDate = new Date(detail.returnDate);
        detail.createDate = new Date(detail.createDate);
       
        // update reference with 'cache'
        this.schedules.then(values => {
          let newData = values.map(val => {
            if (val.id == detail.id) {
              return detail;
            }

            return val;
          })
          // rebuild offline
          this.schedules = new Promise((resolve) => resolve(newData));

          this.schedules.then(schedule => {                  
            let dailySchedules = schedule.filter(scheduleEntry => {              
              // only confirmed and for me for daily report
              if (scheduleEntry.status != CONFIRMED || scheduleEntry.sitter.login != this.authService.getLoggedUser().login)
                return false;
              
              let _matchDate = false;
              scheduleEntry.travelDate.forEach(scheduleDate => {
                if (isToday(scheduleDate)) {
                  _matchDate = true;
                }
              })
              
              return _matchDate;
            });
      
            // no cache for this. wait for the next open
            this.updateOldSchedulesStatus(schedule);
            this.updateDailyReport(dailySchedules);
          });
        })
      }
    })
  }

  async updateOldSchedulesStatus(schedules: Array<Schedule>) {
    let update = false;

    for (let idx = 0; idx < schedules.length; idx++) {
      let schedule = schedules[idx];

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
        await this.backend.addSchedule(schedule.client, schedule, false);
      }
    }
  }
  
  async updateDailyReport(dailySchedules: Array<Schedule>) {
  }

  updateSitterSchedules (event) {
    setTimeout(_ => { 
      event.target.complete();
    }, 1000);
    this.schedules = undefined;
    this.schedules = this.fetchSchedules();

    this.schedules.then(schedule => {     
      let dailySchedules = schedule.filter(scheduleEntry => {       
        // only confirmed and for me for daily report
        if (scheduleEntry.status != CONFIRMED || scheduleEntry.sitter.login != this.authService.getLoggedUser().login)
          return false;
        
        let _matchDate = false;
        scheduleEntry.travelDate.forEach(scheduleDate => {
          if (isToday(scheduleDate)) {
            _matchDate = true;
          }
        })
        
        return _matchDate;
      });

      this.manageCache(schedule);
      this.updateOldSchedulesStatus(schedule);
      this.updateDailyReport(dailySchedules);
    });
  }

  showDetail(schedule: Schedule, idx?: number) {
    this.router.navigate(['agenda_detail'], {relativeTo: this.activatedRoute, queryParams: { schedule: JSON.stringify(schedule) } });
  }

  segmentChanged(event: CustomEvent) {
    if (event.detail.value == "Pendentes") {
      this.filterSegment = PENDING;
    } else if (event.detail.value == "Encaminhados") {
      this.filterSegment = FORWARDED;
    } else if (event.detail.value == "Cancelados") {
      this.filterSegment = CANCELED;
    } else if (event.detail.value == "Confirmados") {
      this.filterSegment = CONFIRMED;
    } else if (event.detail.value == "Realizados") {
      this.filterSegment = DONE;
    } else if (event.detail.value == "Orçamento") {
      this.filterSegment = WAITING_INFO;
    } else if (event.detail.value == "Solic. Cancelamento") {
      this.filterSegment = REQUEST_CANCEL;
    } else if (event.detail.value == "Orçados") {
      this.filterSegment = INFO_DONE;
    }  else if (event.detail.value == "Não Realizados") {
      this.filterSegment = NOT_DONE;
    }
  }
}
