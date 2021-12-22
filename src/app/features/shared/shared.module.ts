import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [AlertComponent]
})
export class SharedModule { }
