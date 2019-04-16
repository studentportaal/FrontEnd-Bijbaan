import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditjobofferComponent } from './editjoboffer.component';

describe('EditjobofferComponent', () => {
  let component: EditjobofferComponent;
  let fixture: ComponentFixture<EditjobofferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditjobofferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditjobofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
