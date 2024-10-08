/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AsistenciasComponent } from './asistencias.component';

describe('AsistenciasComponent', () => {
  let component: AsistenciasComponent;
  let fixture: ComponentFixture<AsistenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsistenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
