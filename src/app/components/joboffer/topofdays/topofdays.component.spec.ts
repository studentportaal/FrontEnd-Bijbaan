import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopOfDaysComponent } from './topofdays.component';

describe('TopOfDaysComponent', () => {
  let component: TopOfDaysComponent;
  let fixture: ComponentFixture<TopOfDaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopOfDaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopOfDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
