import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { PaymentComponent } from './payment.component';
import { PaymentPlanComponent } from './payment-plan/payment-plan.component';
import { PrepaymentPlanComponent } from './prepayment-plan/prepayment-plan.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CurrencyPipe } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PaymentService } from 'src/app/services';

@NgModule({
	declarations: [
		PaymentComponent,
		PaymentPlanComponent,
		PrepaymentPlanComponent
	],
	imports: [
		BrowserModule,
		NgbModule,
		FormsModule,
		ReactiveFormsModule,
		FontAwesomeModule,
		SharedModule
	],
	providers: [CurrencyPipe, PaymentService],
	exports: [PaymentComponent]
})

export class PaymentModule { }