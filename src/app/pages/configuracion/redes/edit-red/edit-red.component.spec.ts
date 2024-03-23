/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditRedComponent } from './edit-red.component';

describe('EditRedComponent', () => {
  let component: EditRedComponent;
  let fixture: ComponentFixture<EditRedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
