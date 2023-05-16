import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Schedule, WAITING_INFO, INFO_DONE, CANCELED, REQUEST_CANCEL, CONFIRMED, FORWARDED } from 'src/app/models/Schedule';
import { Login } from 'src/app/models/Login';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  templateUrl: 'agendadetail.page.html'
})
export class AgendaDetailPage implements OnInit {
  id : number;
  idx: number;
  detail : Schedule
  sitters: Array<Login> = [];
  selectedSitter: string;
  selectedStatus: number;
  disableEditStatus: boolean = true;
  disableEditSitter: boolean = false;
  blockRedirectSchedule: boolean = false;
  blockConfirmSchedule: boolean = false;
  blockCancelSchedule: boolean = false;
  blockUpdateSchedule: boolean = true;
  infoDailyValue: number = 0;

  constructor (private activatedRoute: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    public loadingController: LoadingController,
    private backend: FirebaseService,
    private route: ActivatedRoute,
    private alertController: AlertController) {
  }

  async ngOnInit () {
    let scheduleObj = this.activatedRoute.snapshot.queryParams['schedule'];
    this.detail = JSON.parse(scheduleObj);
    
    // update text to dates
    this.detail.returnDate = new Date(this.detail.returnDate);
    this.detail.createDate = new Date(this.detail.createDate);
    this.detail.travelDate = this.detail.travelDate.map(dtString => new Date(dtString));

    this.sitters = this.detail.company.sitters;

    this.disableEditSitter = false;

    // If is confirmed or cancelled, cant edit
    if (this.detail.status == CANCELED || this.detail.status == CONFIRMED) {
      this.disableEditSitter = true;
      this.disableEditStatus = true;
    }

    // It is waiting for approval, so enable field
    if (this.detail.status == FORWARDED) {
      this.disableEditStatus = false;
      // if forwarded, it can goes to approved/cancel
      this.blockRedirectSchedule = true;
    }

    // Additional states
    if (this.detail.status == REQUEST_CANCEL) {
      // only admin can confirm user cancel request
      if (this.authService.getLoggedUser().type != 0) {
        this.disableEditSitter = true;
        this.disableEditStatus = true;
        this.blockRedirectSchedule = true;
        this.blockCancelSchedule = true;
        this.blockUpdateSchedule = true;
        this.blockConfirmSchedule = true;
      } else {
        this.disableEditSitter = true;
        this.disableEditStatus = false;
        this.blockRedirectSchedule = true;
        this.blockCancelSchedule = false;
        this.blockUpdateSchedule = false;
        this.blockConfirmSchedule = true;
      }
    }

    if (this.detail.status == WAITING_INFO) {
      this.blockRedirectSchedule = true;
      this.blockCancelSchedule = true;
      this.disableEditSitter = true;
      this.blockUpdateSchedule = false;
    }

    if (this.detail.status == INFO_DONE) {
      this.blockRedirectSchedule = true;
      this.blockCancelSchedule = true;
      this.disableEditSitter = true;
      this.blockUpdateSchedule = true;
    }

      this.selectedStatus = this.detail.status;
  }

  configureStatus (sitterSelect, statusSelect) {
    this.disableEditStatus = false;

    // reset status
    statusSelect.value = "0";
    this.blockUpdateSchedule = true;

    if (sitterSelect.value == this.authService.getLoggedUser().login) {
      this.blockRedirectSchedule = true;
      this.blockConfirmSchedule = this.blockCancelSchedule = false;
    } else {
      this.blockRedirectSchedule = false;
      this.blockConfirmSchedule = this.blockCancelSchedule = true;
    }

    this.selectedSitter = sitterSelect.value;
  }

  statusChanged(statusSelect) {
    this.blockUpdateSchedule = false;
    this.selectedStatus = statusSelect.value;
  }

  async updateSchedule () {
    const loading = await this.loadingController.create({
      message: 'Atualizando agendamento...',
      spinner: "dots",
    });
    await loading.present();

    this.detail.status = this.selectedStatus;

    // if sitter is defined for this status
    if (this.selectedSitter) {
      let sitterLogin = this.detail.company.sitters.filter(sitter => sitter.login == this.selectedSitter);
      this.detail.sitter = sitterLogin[0];
    }

    // waiting info update
    if (this.detail.status == WAITING_INFO) {
      if (this.infoDailyValue)
        this.detail.scheduleValue = this.infoDailyValue;
      
      this.detail.status = INFO_DONE;
    }

    let finalSchedule = await this.backend.addSchedule(this.detail.client, this.detail, false);

    loading.dismiss();

    if (!finalSchedule) {
      const alert = await this.alertController.create({
        header: "Não foi possível atualizar este agendamento, tente mais tarde!",
        buttons: [ 'OK' ]
      });
  
      await alert.present();
    } else {
      this.router.navigate(['/sitterTabs/tab1'], { queryParams: { scheduleUpdated: JSON.stringify(this.detail) } });
    }    
  }

}
