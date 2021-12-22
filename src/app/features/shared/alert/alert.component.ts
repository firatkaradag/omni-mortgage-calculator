import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.sass']
})
export class AlertComponent implements OnInit {

  @Input() alert!: string;
  @Input() type!: string;
  @Input() set display(display: boolean) {
    this.hide = !display;
  };

  icon = faInfoCircle
  hide = true
  message = ''

  show = () => { this.hide = false }
  constructor() { }

  ngOnInit(): void { }

}
