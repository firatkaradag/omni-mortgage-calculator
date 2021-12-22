import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { PrepaymentPlanComponent } from './prepayment-plan.component';

describe('PrepaymentPlanComponent', () => {
  let component: PrepaymentPlanComponent;
  let fixture: ComponentFixture<PrepaymentPlanComponent>;
  
  @Component({selector: 'app-alert', template: ''})
  class AlertStubComponent {}
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrepaymentPlanComponent, AlertStubComponent ],
      providers: [CurrencyPipe, FormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepaymentPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
