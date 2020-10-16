import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  feedbackType;
  showClassFeedbackForm;
  showInstructorFeedbackForm;
  showLessonFeedbackForm;


  constructor() { }

  ngOnInit() {
    this.showClassFeedbackForm = true;
    this.showInstructorFeedbackForm = false;
    this.showLessonFeedbackForm = false;
    this.feedbackType = "class";
  }

  selectFeedbackForm(segment: any) {
    console.log(segment.detail.value);

    this.feedbackType = segment.detail.value;

  }

}
