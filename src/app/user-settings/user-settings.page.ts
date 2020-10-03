import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.page.html',
  styleUrls: ['./user-settings.page.scss'],
})
export class UserSettingsPage implements OnInit {

  user;

  constructor(
    public db: DbService,
  ) { }

  ngOnInit() {
    this.user = {name: "scott", email: "asdfsadf@aol.com"}
  }

  submitUserSettings(data) {
    console.log("this is new user settings: ", data);
  }

}
