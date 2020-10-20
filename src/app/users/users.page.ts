import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { AlertController, ModalController } from '@ionic/angular';

import { DbService } from '../services/db.service';
import { UserFormComponent } from "./user-form/user-form.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users;

  constructor(
    public db: DbService,
    public modal: ModalController,
    private alert: AlertController,
  ) { }

  ngOnInit() {
    this.users = this.db.collection$('users', ref =>
      ref
        .orderBy('displayName', 'asc')
        .where('isAnonymous', '==', false)
      ), shareReplay(1); // only read the doc 1 if you subscribe to the observable multiple times.
  }
  openCloseSlider(itemSlide) {
    if (itemSlide.el.classList.contains('item-sliding-active-slide')) {
      itemSlide.close();
    } else {
      itemSlide.open();
    }
  }

  async presentForm(user?: any) {
    const modal = await this.modal.create({
      component: UserFormComponent,
      componentProps: { user }
    });
    return await modal.present();
  }

  trackById(id, user) {
    return user.id;
  }

  edit(user) {
    this.presentForm(user);
  }

  async openDeleteAlert(user) {
    const alert = await this.alert.create({
      header: 'Delete User?',
      message: 'Warning ' + user.name + ' will be permanently removed!',
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
            this.delete(user);
          }
        }
      ]
    });
    await alert.present();
  }

  delete(user) {
    this.db.delete(`users/${user.id}`);
  }
}
