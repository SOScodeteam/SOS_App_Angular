import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ToastController } from '@ionic/angular';
import { shareReplay } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase';



@Component({
  selector: 'app-feedback-form-instructor',
  templateUrl: './feedback-form-instructor.component.html',
  styleUrls: ['./feedback-form-instructor.component.scss'],
})
export class FeedbackFormInstructorComponent implements OnInit {

  feedbackForm: FormGroup;
  instructors;
  feedback;

  constructor(
    private db: DbService, 
    private fb: FormBuilder,
    private toast: ToastController
  ) { }

  ngOnInit() {

    const data = {
      instructor: {},
      ...this.feedback
    };

    this.feedbackForm = this.fb.group({
      instructor: [ data.instructor,[Validators.required]],
      comment: [ data.comment, [Validators.required, Validators.maxLength(300), Validators.minLength(1)]],
    });

    this.instructors = this.db.collection$('instructors', ref =>
    ref
      .orderBy('lastName', 'asc')
    ),
    shareReplay(1);
  }

  async create() {
    const id = this.feedback ? this.feedback.id : '';

    const data = {
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      ...this.feedback,
      ...this.feedbackForm.value,
    };
    this.db.updateAt(`feedback/${id}`, data);
  }

  trackByInstructor(id, instructor) {
    return instructor.id
  }

  async submitFeedback(){
    await this.create();
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
