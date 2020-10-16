import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-instructor-form',
  templateUrl: './instructor-form.component.html',
  styleUrls: ['./instructor-form.component.scss'],
})
export class InstructorFormComponent implements OnInit {

  instructorForm: FormGroup;
  instructor;

  constructor(
    private db: DbService,
    private modal: ModalController,
    private fb: FormBuilder,
    private alert: AlertController,
  ) { }

  ngOnInit() {
    const data = {
      name: '',
      ...this.instructor
    };

    this.instructorForm = this.fb.group({
      name: [data.name, [Validators.required]]
    });
  }

  async create() {
    const id = this.instructor ? this.instructor.id : '';

    const data = {
      ...this.instructor,
      ...this.instructorForm.value,
    };
    this.db.updateAt(`instructors/${id}`, data);
    this.modal.dismiss();
  }

  async openDeleteAlert() {
    const alert = await this.alert.create({
      header: 'Delete Instructor?',
      message: 'Warning ' + this.instructor.name + ' will be permanently removed!',
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
    this.db.delete(`instructors/${this.instructor.id}`);
    this.modal.dismiss();
  }

  closeModal() {
    this.modal.dismiss();
  }

}

