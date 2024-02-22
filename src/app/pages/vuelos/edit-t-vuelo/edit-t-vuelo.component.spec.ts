/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditTVueloComponent } from './edit-t-vuelo.component';

describe('EditTVueloComponent', () => {
  let component: EditTVueloComponent;
  let fixture: ComponentFixture<EditTVueloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTVueloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTVueloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
