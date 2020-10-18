import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FeedbackPageRoutingModule } from './feedback-routing.module';
import { FeedbackPage } from './feedback.page';
import { FeedbackFormClassComponent } from './feedback-form-class/feedback-form-class.component';
import { FeedbackFormInstructorComponent } from './feedback-form-instructor/feedback-form-instructor.component';
import { FeedbackFormLessonComponent } from './feedback-form-lesson/feedback-form-lesson.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedbackPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    FeedbackPage, 
    FeedbackFormClassComponent, 
    FeedbackFormInstructorComponent, 
    FeedbackFormLessonComponent
  ]
})
export class FeedbackPageModule {}