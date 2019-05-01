import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyfilterdialogComponent } from './companyfilterdialog.component';

describe('CompanyfilterdialogComponent', () => {
  let component: CompanyfilterdialogComponent;
  let fixture: ComponentFixture<CompanyfilterdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyfilterdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyfilterdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
