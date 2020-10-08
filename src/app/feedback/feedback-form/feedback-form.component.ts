import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
})
export class FeedbackFormComponent implements OnInit {
  feedbackForm: FormGroup;

  classes = [
    {
      content: "Week 1: Know Yourself to Lead Yourself",
      value: "weekOne"
    },
    {
      content: "Week 2: Know Your Team to Lead Your Team",
      value: "weekTwo"
    },
    {
      content: "Week 3: Accelerating Change and Solving Problems Together",
      value: "weekThree"
    },
    {
      content: "Week 4 & 5: Joint Warfare",
      value: "weekFourFive"
    },
    {
      content: "Other",
      value: "other"
    }
  ];

  flights = [
    {
      content: "F-1",
      value: "fOne"
    },
    {
      content: "F-2",
      value: "fTwo"
    },
    {
      content: "F-3",
      value: "fThree"
    },
    {
      content: "F-4",
      value: "fFour"
    },
    {
      content: "N/A",
      value: "notAvailable"
    }
  ];
  
  constructor(private fb: FormBuilder) { }
  
  ngOnInit() {
    this.feedbackForm = new FormGroup({
      class: new FormControl(null, {
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
    })
  }

  onSubmit() {
    console.log(this.feedbackForm)
  }
}