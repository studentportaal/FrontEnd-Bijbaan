import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopofdaysComponent } from './topofdays.component';

describe('TopofdaysComponent', () => {
  let component: TopofdaysComponent;
  let fixture: ComponentFixture<TopofdaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopofdaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopofdaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
