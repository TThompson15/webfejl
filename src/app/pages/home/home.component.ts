import { Component } from '@angular/core';
import { MessageCardComponent } from '../../components/message.card/message.card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MessageCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}
