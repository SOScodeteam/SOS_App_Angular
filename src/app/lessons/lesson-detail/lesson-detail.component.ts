import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.scss'],
})
export class LessonDetailComponent implements OnInit {

  lesson$;

  constructor(private route: ActivatedRoute, private db: DbService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.lesson$ = this.db.doc$(`lessons/${id}`)
  }

}
