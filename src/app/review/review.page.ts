import { Component, OnInit } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';


import { DbService } from '../services/db.service';
import { FeedbackDetailsComponent } from "./feedback-details/feedback-details.component";

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  feedback;
  lessonFilter = true;
  instructorFilter = true;
  classFilter = true;


  constructor(
    public db: DbService,
    public modal: ModalController
  ) { }

  ngOnInit() {
    this.feedback = this.db.collection$('feedback', ref => 
      ref
        .orderBy('createdAt', 'desc')
    ), shareReplay(1); // only read the doc 1 if you subscribe to the observable multiple times.
  }

  async showDetails(fb) {
    const modal = await this.modal.create({
      component: FeedbackDetailsComponent,
      componentProps: { fb }
    });
    return await modal.present();
  }
  toggleFilter(filter) {
    switch(filter) {
      case 'lesson':
        this.lessonFilter = !this.lessonFilter;
        break;
      case 'class':
        this.classFilter = !this.classFilter;
        break;
      default:
        this.instructorFilter = !this.instructorFilter;
    }
  }

}
