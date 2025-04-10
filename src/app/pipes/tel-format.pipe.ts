import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telFormat',
  standalone: true
})
export class TelFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    // Pl. 06301234567 → +36 30 123 4567
    const match = value.match(/^06(\d{2})(\d{3})(\d{4})$/);
    return match ? `+36 ${match[1]} ${match[2]} ${match[3]}` : value;
  }
}
