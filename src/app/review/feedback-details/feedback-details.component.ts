import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

//////////
// added
//////////


//////////

@Component({
  selector: 'app-feedback-details',
  templateUrl: './feedback-details.component.html',
  styleUrls: ['./feedback-details.component.scss'],
})
export class FeedbackDetailsComponent implements OnInit {
  fb;

  constructor(private modal: ModalController) { }

  ngOnInit() {
    const data = {
      ...this.fb
    };
    console.log(data);
  }

  closeModal() {
    this.modal.dismiss();
  }

  // submitResponse() {
  //   console.log('Submit Response button clicked');
  // }

  initiateNewResponse() {
    console.log('Create Response button clicked');
    console.log(`this.fb.id: ${this.fb.id}`);
    console.log('import user id to this page - use as input to createResponseFunction'); 
  }

  getKeys(obj) {
    return Object.keys(obj);
  }
}
