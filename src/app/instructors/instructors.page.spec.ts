import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InstructorsPage } from './instructors.page';

describe('InstructorsPage', () => {
  let component: InstructorsPage;
  let fixture: ComponentFixture<InstructorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InstructorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
