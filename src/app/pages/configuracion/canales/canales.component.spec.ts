/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CanalesComponent } from './canales.component';

describe('CanalesComponent', () => {
  let component: CanalesComponent;
  let fixture: ComponentFixture<CanalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
