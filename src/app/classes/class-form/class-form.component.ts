import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.scss'],
})
export class ClassFormComponent implements OnInit {

  classForm: FormGroup;
  cls;

  constructor(
    private db: DbService,
    private modal: ModalController,
    private fb: FormBuilder,
    private alert: AlertController,
  ) { }

  ngOnInit() {
    const data = {
      name: '',
      ...this.cls
    };

    this.classForm = this.fb.group({
      name: [data.name, [Validators.required]]
    });
  }

  async create() {
    const id = this.cls ? this.cls.id : '';

    const data = {
      ...this.cls,
      ...this.classForm.value,
    };
    this.db.updateAt(`classes/${id}`, data);
    this.modal.dismiss();
  }

  async openDeleteAlert() {
    const alert = await this.alert.create({
      header: 'Delete Course?',
      message: 'Warning ' + this.cls.name + ' will be permanently removed!',
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
    this.db.delete(`classes/${this.cls.id}`);
    this.modal.dismiss();
  }

  closeModal() {
    this.modal.dismiss();
  }

}
