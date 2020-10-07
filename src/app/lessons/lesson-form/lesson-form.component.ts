import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { shareReplay } from 'rxjs/operators';
import { DbService } from '../../services/db.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-lesson-form',
  templateUrl: './lesson-form.component.html',
  styleUrls: ['./lesson-form.component.scss'],
})
export class LessonFormComponent implements OnInit {

  lessonForm : FormGroup;
  lesson;

  constructor(
    private db: DbService,
    private modal: ModalController,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    const data = {
      name: '',
      runobjectivesFor: '',
      ...this.lesson
    };

    this.lessonForm = this.fb.group({
      name: [data.name, [Validators.required]],
      objective: [data.objective, [Validators.required]],
    });

  }

  async create() {
    const id = this.lesson ? this.lesson.id : '';

    const data = {
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      ...this.lesson,
      ...this.lessonForm.value,
    };
    this.db.updateAt(`lessons/${id}`, data);
    this.modal.dismiss();
  }

  closeModal()
  {
    this.modal.dismiss();
  }

}
