import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { LessonsPageRoutingModule } from './lessons-routing.module';
import { LessonsPage } from './lessons.page';
import { LessonFormComponent } from './lesson-form/lesson-form.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';

const routes: Routes = [
  {
    path: '',
    component: LessonsPage
  },
  {
    path: ':id',
    component: LessonDetailComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [LessonsPage, LessonDetailComponent, LessonFormComponent],
  entryComponents: [LessonFormComponent]
})
export class LessonsPageModule {}
