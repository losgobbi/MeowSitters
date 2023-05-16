import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CalendarComponentOptions } from 'ion2-calendar';
@Component({
  selector: 'app-modal-calendar',
  templateUrl: './modal-calendar.component.html',
})
export class ModalCalendarComponent {
  dateValue: Date[];
  type = 'js-date';
  optionsMulti: CalendarComponentOptions = {
    color: 'danger',
    pickMode: 'multi',
    monthFormat: 'MM/YYYY',
    weekdays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', ],
    monthPickerFormat: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
    weekStart: 1,
  };
  
  constructor(private modalController: ModalController,
    private params: NavParams) { 
      if (params.get('viewSrc') === 'singleDate')
        this.optionsMulti.pickMode = 'single'
    }

  dismissModal () {
    this.modalController.dismiss({dateValue : this.dateValue});
  }
}
