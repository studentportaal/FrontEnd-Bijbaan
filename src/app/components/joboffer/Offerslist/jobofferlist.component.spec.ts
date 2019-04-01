import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobofferlistComponent } from './jobofferlist.component';

describe('JobofferlistComponent', () => {
  let component: JobofferlistComponent;
  let fixture: ComponentFixture<JobofferlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobofferlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobofferlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
