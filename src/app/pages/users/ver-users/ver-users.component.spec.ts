/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VerUsersComponent } from './ver-users.component';

describe('VerUsersComponent', () => {
  let component: VerUsersComponent;
  let fixture: ComponentFixture<VerUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
