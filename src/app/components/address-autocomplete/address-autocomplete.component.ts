import { Component, ElementRef, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare const google: any;

@Component({
  selector: 'app-address-autocomplete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <input type="text" #input class="address-input" placeholder="Kezdd el gépelni a címet..." />
  `,
  styles: [`
    .address-input {
      width: 100%;
      padding: 8px;
      font-size: 1rem;
    }
  `]
})
export class AddressAutocompleteComponent implements AfterViewInit {

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  @Output() addressSelected = new EventEmitter<string>();

  ngAfterViewInit(): void {
    const autocomplete = new google.maps.places.Autocomplete(this.input.nativeElement, {
      types: ['address'],
      componentRestrictions: { country: 'hu' }
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        this.addressSelected.emit(place.formatted_address);
      }
    });
  }
}
