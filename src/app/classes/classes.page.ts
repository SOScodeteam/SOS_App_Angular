import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { AlertController, ModalController } from '@ionic/angular';

import { DbService } from '../services/db.service';
import { ClassFormComponent } from './class-form/class-form.component';


@Component({
  selector: 'app-classes',
  templateUrl: './classes.page.html',
  styleUrls: ['./classes.page.scss'],
})
export class ClassesPage implements OnInit {

  classes;

  constructor(
    public db: DbService,
    public modal: ModalController,
    private alert: AlertController,
  ) { }

  ngOnInit() {
    this.classes = this.db.collection$('classes', ref =>
      ref
        .orderBy('name', 'asc')
      ), shareReplay(1); // only read the doc 1 if you subscribe to the observable multiple times.
  }
  openCloseSlider(itemSlide) {
    if (itemSlide.el.classList.contains('item-sliding-active-slide')) {
      itemSlide.close();
    } else {
      itemSlide.open();
    }
  }

  async presentForm(cls?: any) { // need to use the name "cls" b/c "class" is reserved word
    const modal = await this.modal.create({
      component: ClassFormComponent,
      componentProps: { cls }
    });
    return await modal.present();
  }

  trackById(id, cls) {
    return cls.id;
  }

  edit(cls) {
    this.presentForm(cls);
  }

  async openDeleteAlert(cls) {
    const alert = await this.alert.create({
      header: 'Delete Class?',
      message: 'Warning ' + cls.name + ' will be permanently removed!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'medium',
          handler: () => {
            console.log('Delete canceled');
          },
        },
        {
          text: 'Delete',
          cssClass: 'danger',
          handler: () => {
            this.delete(cls);
          }
        }
      ]
    });
    await alert.present();
  }

  delete(cls) {
    this.db.delete(`classes/${cls.id}`);
  }
}
