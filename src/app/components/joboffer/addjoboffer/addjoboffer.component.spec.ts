import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddjobofferComponent } from './addjoboffer.component';

describe('AddjobofferComponent', () => {
  let component: AddjobofferComponent;
  let fixture: ComponentFixture<AddjobofferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddjobofferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddjobofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
