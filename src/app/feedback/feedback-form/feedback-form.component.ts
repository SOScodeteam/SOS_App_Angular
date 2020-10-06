import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
})
export class FeedbackFormComponent implements OnInit {


classes = ['Really Smart', 'Super Flexible',
  'Super Hot', 'Weather Changer'];

// model = new Feedback(this.classes[0], 'Hello', 'yo', 'Chuck Overstreet');

submitted = false;

onSubmit() { this.submitted = true; }

// get diagnostic() { return JSON.stringify(this.model); }

name = new FormControl('');

updateName() {
this.name.setValue('Nancy');
}

title = "Feedback Form Testing";

submitFeedback(data) {
console.log("this is the data " + data);
}

constructor() { }

ngOnInit() {}

// onSubmit(form: NgForm) {
//   console.log(form);
// }

}
