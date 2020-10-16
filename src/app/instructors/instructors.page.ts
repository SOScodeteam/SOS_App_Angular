import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { AlertController, ModalController } from '@ionic/angular';

import { DbService } from '../services/db.service';
import { InstructorFormComponent } from "./instructor-form/instructor-form.component";

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.page.html',
  styleUrls: ['./instructors.page.scss'],
})
export class InstructorsPage implements OnInit {
  instructors;

  constructor(
    public db: DbService,
    public modal: ModalController,
    private alert: AlertController,
  ) { }

  ngOnInit() {
    this.instructors = this.db.collection$('instructors', ref =>
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

  async presentForm(instructor?: any) {
    const modal = await this.modal.create({
      component: InstructorFormComponent,
      componentProps: { instructor }
    });
    return await modal.present();
  }

  trackById(id, instructor) {
    return instructor.id;
  }

  edit(instructor) {
    this.presentForm(instructor);
  }

  async openDeleteAlert(instructor) {
    const alert = await this.alert.create({
      header: 'Delete Instructor?',
      message: 'Warning ' + instructor.name + ' will be permanently removed!',
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
            this.delete(instructor);
          }
        }
      ]
    });
    await alert.present();
  }

  delete(instructor) {
    this.db.delete(`instructors/${instructor.id}`);
  }
}
