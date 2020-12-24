import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  pages: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public auth: AuthService
  ) {
    this.sideMenu();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  sideMenu()
  {
    this.pages =
    [
      // order user seen pages here
      {
        title: 'Home',
        url  : '/home',
        icon : 'home',
        role : 'student'
      },
      { // Feedback form
        title: 'Submit Feedback',
        url  : '/feedback',
        icon : 'create',
        role : 'student'
      },
      { // My Feedback (View instr responses)
        title: 'Review My Feedbacks',
        url  : '/student/review',
        icon : 'stats-chart',
        role : 'student'
      },
      // Order Admin pages here
      {
        title: 'Review Feedback',
        url  : '/admin/review',
        icon : 'stats-chart',
        role : 'admin'
      },
      {
        title: 'Manage Classes',
        url  : '/admin/classes',
        icon : 'file-tray-full',
        role : 'admin'
      },
      {
        title: 'Manage Lessons',
        url  : '/admin/lessons',
        icon : 'book',
        role : 'admin'
      },
      {
        title: 'Manage Flights',
        url  : '/admin/flights',
        icon : 'people-circle',
        role : 'admin'
      },
      {
        title: 'Manage Instructors',
        url  : '/admin/instructors',
        icon : 'person',
        role : 'admin'
      },
      {
        title: 'Manage Users',
        url  : '/admin/users',
        icon : 'person-add',
        role : 'admin'
      },
    ];
  }
}
