import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnjoboffersComponent } from './ownjoboffers.component';

describe('OwnjoboffersComponent', () => {
  let component: OwnjoboffersComponent;
  let fixture: ComponentFixture<OwnjoboffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnjoboffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnjoboffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
