import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanMyDayComponent } from './plan-my-day.component';

describe('PlanMyDayComponent', () => {
  let component: PlanMyDayComponent;
  let fixture: ComponentFixture<PlanMyDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanMyDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanMyDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
