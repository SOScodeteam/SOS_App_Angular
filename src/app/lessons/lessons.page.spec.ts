import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LessonsPage } from './lessons.page';

describe('LessonsPage', () => {
  let component: LessonsPage;
  let fixture: ComponentFixture<LessonsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LessonsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
