import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFilterDialogComponent } from './companyfilterdialog.component';

describe('CompanyfilterdialogComponent', () => {
  let component: CompanyFilterDialogComponent;
  let fixture: ComponentFixture<CompanyFilterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyFilterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
