import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSkillsComponent } from './editskills.component';

describe('EditskillsComponent', () => {
  let component: EditSkillsComponent;
  let fixture: ComponentFixture<EditSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
