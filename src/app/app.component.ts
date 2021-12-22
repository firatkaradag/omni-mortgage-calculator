import { Component } from '@angular/core';
import { faCanadianMapleLeaf } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  faCanadianMapleLeaf = faCanadianMapleLeaf
  title = 'Mortgate Calculator';
}
