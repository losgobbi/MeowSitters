import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterCatComponent } from './register-cat/register-cat.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Cat } from 'src/app/models/Cat';

@Component({
  templateUrl: 'mycats.page.html',
})
export class MyCatsPage implements OnInit {

  private cats: Array<Cat>;

  constructor (private modalCtrl: ModalController,
    public authService : AuthService,
    private activatedRoute: ActivatedRoute,
    private backend: FirebaseService,
    private router: Router) {
  }

  ngOnInit() {
    this.cats = this.authService.getLoggedUser().info.cats;

    this.activatedRoute.queryParams.subscribe(val => {
      let catObj = val['catUpdated'];
      if (catObj) {
        this.refreshCats(catObj);
      }
    })
  }

  async addCat () {
    const modal = await this.modalCtrl.create({ component: RegisterCatComponent, }  );
    modal.onDidDismiss().then((data) => {
      let catObj = data.data['catUpdated'];
      this.refreshCats(catObj);
    });
    await modal.present();
  }

  showDetail(cat: Cat) {
    this.router.navigate(['cat_detail'], {relativeTo: this.activatedRoute, queryParams: { cat: JSON.stringify(cat) } });
  }

  refreshCats(cat: string) {
    let catUpdated : Cat = JSON.parse(cat);

    // update reference with 'cache'
    if (this.cats.length == 0) {
      this.cats.push(catUpdated);
    } else {
      this.cats  = this.cats.map(val => {
        if (val.id == catUpdated.id) {
          return catUpdated;
        }
        return val;
      });
    }
  }
}
