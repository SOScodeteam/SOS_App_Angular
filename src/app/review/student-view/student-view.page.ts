import { Component, OnInit } from '@angular/core';
import { shareReplay } from 'rxjs/operators';

import { DbService } from '../../services/db.service';

@Component({
    selector: 'app-student-view',
    templateUrl: './student-view.page.html',
    styleUrls: ['./student-view.page.scss'],
})
export class StudentViewPage implements OnInit {
    response;

    constructor(
        public db: DbService,
    ) {}

    ngOnInit() {
        this.response = this.db.collection$('response', ref =>
        ref
            .orderBy('createdAt', 'desc')    
        ), shareReplay(1);
    }


}