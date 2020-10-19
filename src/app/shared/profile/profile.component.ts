import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input()
  user;
  constructor(public auth: AuthService) { }

  ngOnInit() {}

}
