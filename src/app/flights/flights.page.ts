import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { AlertController, ModalController } from '@ionic/angular';

import { DbService } from '../services/db.service';
import { FlightFormComponent } from "./flight-form/flight-form.component";

@Component({
  selector: 'app-flights',
  templateUrl: './flights.page.html',
  styleUrls: ['./flights.page.scss'],
})
export class FlightsPage implements OnInit {

  flights;

  constructor(
    public db: DbService,
    public modal: ModalController,
    private alert: AlertController,
  ) { }

  ngOnInit() {
    this.flights = this.db.collection$('flights', ref =>
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

  async presentForm(flight?: any) {
    const modal = await this.modal.create({
      component: FlightFormComponent,
      componentProps: { flight }
    });
    return await modal.present();
  }

  trackById(id, flight) {
    return flight.id;
  }

  edit(flight) {
    this.presentForm(flight);
  }

  async openDeleteAlert(flight) {
    const alert = await this.alert.create({
      header: 'Delete Flight?',
      message: 'Warning ' + flight.name + ' will be permanently removed!',
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
            this.delete(flight);
          }
        }
      ]
    });
    await alert.present();
  }

  delete(flight) {
    this.db.delete(`flights/${flight.id}`);
  }
}
