import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="message-card">
      <p>{{ message }}</p>
    </div>
  `,
  styles: [`
    .message-card {
      padding: 1rem;
      background-color: #f0f4ff;
      border-radius: 8px;
      margin-bottom: 1rem;
      font-size: 1.1rem;
      color: #333;
    }
  `]
})
export class MessageCardComponent {
  @Input() message = '';
}
