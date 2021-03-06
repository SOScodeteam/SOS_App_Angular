import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DbService } from 'src/app/services/db.service';


@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.scss'],
})
export class FlightFormComponent implements OnInit {

  flightForm: FormGroup;
  @Input() flight?;
  @Input() classes;
  classExists = true;

  constructor(
    private db: DbService,
    private modal: ModalController,
    private fb: FormBuilder,
    private alert: AlertController,
  ) { }

  ngOnInit() {
    const data = {
      name: '',
      ...this.flight
    };

    if (this.flight && !this.classes.filter(cls => cls.name === this.flight.class).length) {
      this.classExists = false;
    }

    this.flightForm = this.fb.group({
      name: [data.name, [Validators.required]],
      class: [data.class, [Validators.required]],
    });
  }

  async create() {
    const id = this.flight ? this.flight.id : '';

    const data = {
      ...this.flight,
      ...this.flightForm.value,
    };
    this.db.updateAt(`flights/${id}`, data);
    this.modal.dismiss();
  }

  // TODO: Figure out how to call the parent method so there is less code reuse.
  async openDeleteAlert() {
    const alert = await this.alert.create({
      header: 'Delete Flight?',
      message: 'Warning ' + this.flight.name + ' will be permanently removed!',
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
            this.delete();
          }
        }
      ]
    });
    await alert.present();
  }

  delete() {
    this.db.delete(`flights/${this.flight.id}`);
    this.modal.dismiss();
  }

  closeModal() {
    this.modal.dismiss();
  }
}
