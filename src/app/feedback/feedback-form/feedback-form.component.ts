import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DbService } from '../../services/db.service';
import * as firebase from 'firebase';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
})
export class FeedbackFormComponent implements OnInit {
  feedbackForm: FormGroup;
  feedback;
  lessons;
  flights;
  
  constructor(
    private db: DbService,
    private modal: ModalController,
    private fb: FormBuilder
  ) { }
  
  ngOnInit() {
    this.feedbackForm = new FormGroup({
      lesson: new FormControl(null, {
        updateOn: "submit",
        validators: [Validators.required]
      }),
      flight: new FormControl(null, {
        updateOn: "submit",
        validators: [Validators.required]
      }),
      comment: new FormControl(null, {
        updateOn: "submit",
        validators: [Validators.required, Validators.maxLength(300), Validators.minLength(1)]
      })
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
}