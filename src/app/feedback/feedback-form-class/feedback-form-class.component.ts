import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { DbService } from '../../services/db.service';
import * as firebase from 'firebase';
import { shareReplay } from 'rxjs/operators';


@Component({
  selector: 'app-feedback-form-class',
  templateUrl: './feedback-form-class.component.html',
  styleUrls: ['./feedback-form-class.component.scss'],
})
export class FeedbackFormClassComponent implements OnInit {
  
  feedbackForm: FormGroup;
  feedback;
  classes;
  
  constructor(
    private db: DbService,
    private modal: ModalController,
    private fb: FormBuilder,
    private toast: ToastController
  ) { }
  
  ngOnInit() {
    const data = {
      class: {},
      ...this.feedback
    };

    this.feedbackForm = this.fb.group({
      class: [ data.lesson,[Validators.required]],
      comment: [ data.comment, [Validators.required, Validators.maxLength(300), Validators.minLength(1)]],
    });

    this.classes = this.db.collection$('classes', ref =>
    ref
      .orderBy('name', 'asc')
    ), shareReplay(1); // only read the doc 1 if you subscribe to the observable multiple times.
}

  async create() {
    const id = this.feedback ? this.feedback.id : '';

    const data = {
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      ...this.feedback,
      ...this.feedbackForm.value,
    };
    this.db.updateAt(`feedback/${id}`, data);
    this.modal.dismiss();
  }

  trackById(id, cls) {
    return cls.id;
  }

  submitFeedback(){
    this.presentToast();
    this.clearForm();
  }

  async presentToast() {
    const toast = await this.toast.create({
      message: 'Thank you for your feedback!',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  clearForm() {
    this.feedbackForm.reset();
  }
}