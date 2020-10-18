import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

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
  }

  closeModal() {
    this.modal.dismiss();
  }

  getKeys(obj) {
    return Object.keys(obj);
  }
}
