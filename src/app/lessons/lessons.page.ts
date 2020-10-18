import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap, map, shareReplay } from 'rxjs/operators';
import { DbService } from '../services/db.service';

import { ModalController, AlertController } from '@ionic/angular';
import { LessonFormComponent } from './lesson-form/lesson-form.component';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.page.html',
  styleUrls: ['./lessons.page.scss'],
})
export class LessonsPage implements OnInit {

  lessons;

  constructor(
    public db: DbService,
    public modal: ModalController,
    public alert: AlertController
  ) { }

  ngOnInit() {
    this.lessons = this.db.collection$('lessons', ref =>
      ref
        .orderBy('name', 'asc')
      ), shareReplay(1); // only read the doc 1 if you subscribe to the observable multiple times.
  }

  async presentForm(lesson?: any) {
    const modal = await this.modal.create({
      component: LessonFormComponent,
      componentProps: { lesson }
    });
    return await modal.present();
  }

  async openDeleteAlert(lesson) {
    const alert = await this.alert.create({
      header: 'Delete lesson ?',
      message: 'Warning! ' + lesson.name + ' will be permanently removed!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'light',
          handler: () => {
            console.log('Delete canceled');
          },
        },
        {
          text: 'Delete',
          cssClass: 'danger',
          handler: () => {
            this.delete(lesson);
          },
        },
      ],
    });
  
    await alert.present();
  }

  delete(lesson) {
    this.db.delete(`lessons/${lesson.id}`);
  }

  trackById(id, lesson) {
    return lesson.id
  }

}
