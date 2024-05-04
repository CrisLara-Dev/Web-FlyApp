/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TipoVueloComponent } from './tipo-vuelo.component';

describe('TipoVueloComponent', () => {
  let component: TipoVueloComponent;
  let fixture: ComponentFixture<TipoVueloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoVueloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoVueloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
