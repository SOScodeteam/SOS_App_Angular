import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  user;

  roles = [
    { name: 'admin', isChecked: false },
    { name: 'instructor', isChecked: false },
    { name: 'sos', isChecked: false },
    { name: 'student', isChecked: false },
  ];
  ranks = [
    {name: "Capt" }, 
    {name: "Maj" }, 
    {name: "Lt Col"}, 
    {name: "Col"}, 
    {name: "Brig Gen"}, 
    {name: "Maj Gen"}
  ];
  constructor(
    private db: DbService,
    private modal: ModalController,
    private fb: FormBuilder,
    private alert: AlertController,
  ) { }

  ngOnInit() {
    const data = {
      ...this.user
    };

    this.userForm = this.fb.group({
      rank: [data.rank, [Validators.required]],
      firstName: [data.firstName, [Validators.required]],
      lastName: [data.lastName, [Validators.required]],
      email: [data.email, [Validators.required]],
      photoURL: [data.photoURL],
      isAnonymous: [data.isAnonymous, [Validators.required]],
      roles: this.fb.group({
        admin: [data.roles["admin"], [Validators.required]],
        instructor: [data.roles["instructor"], [Validators.required]],
        sos: [data.roles["sos"], [Validators.required]],
        student: [data.roles["student"], [Validators.required]],
      })
    });
  }

  async create() {
    const id = this.user ? this.user.id : '';

    const data = {
      
      roles: [
        {admin: this.user.roles["admin"]},
        {instructor: this.user.roles["instructor"]},
        {sos: this.user.roles["sos"]},
        {student: this.user.roles["student"]},
        ],
      ...this.user,
      ...this.userForm.value,
      displayName: this.userForm.value.rank + ' ' + this.userForm.value.firstName + ' ' + this.userForm.value.lastName,
    };
    this.db.updateAt(`users/${id}`, data);
    this.modal.dismiss();
  }

  async openDeleteAlert() {
    const alert = await this.alert.create({
      header: 'Delete User?',
      message: 'Warning ' + this.user.displayName + ' will be permanently removed!',
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
    this.db.delete(`users/${this.user.id}`);
    this.modal.dismiss();
  }

  closeModal() {
    this.modal.dismiss();
  }


}

