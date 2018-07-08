import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeBtnComponent } from './type-btn.component';

describe('TypeBtnComponent', () => {
  let component: TypeBtnComponent;
  let fixture: ComponentFixture<TypeBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
