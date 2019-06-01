import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserjoboffersComponent } from './userjoboffers.component';

describe('UserjoboffersComponent', () => {
  let component: UserjoboffersComponent;
  let fixture: ComponentFixture<UserjoboffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserjoboffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserjoboffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
