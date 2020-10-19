import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ModalController, ToastController } from '@ionic/angular';
import { shareReplay } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-feedback-form-lesson',
  templateUrl: './feedback-form-lesson.component.html',
  styleUrls: ['./feedback-form-lesson.component.scss'],
})
export class FeedbackFormLessonComponent implements OnInit {
  feedbackForm: FormGroup;
  feedback;
  lessons;
  flights;
  
  constructor(
    private db: DbService,
    private modal: ModalController,
    private fb: FormBuilder,
    private toast: ToastController
  ) { }
  
  ngOnInit() {
    const data = {
      lesson: {},
      flight: {},
      ...this.feedback
    };

    this.feedbackForm = this.fb.group({
      lesson: [ data.lesson,[Validators.required]],
      flight: [ data.flight,[Validators.required]],
      comment: [ data.comment, [Validators.required, Validators.maxLength(300), Validators.minLength(1)]],
    });

    this.lessons = this.db.collection$('lessons', ref =>
    ref
      .orderBy('name', 'asc')
    ), shareReplay(1); // only read the doc 1 if you subscribe to the observable multiple times

    this.flights = this.db.collection$('flights', ref =>
    ref
      .orderBy('name', 'asc')
    ), shareReplay(1); // only read the doc 1 if you subscribe to the observable multiple times
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

  trackByIdLesson(id, lesson) {
    return lesson.id
  }

  trackByIdFlight(id, flight) {
    return flight.id
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
