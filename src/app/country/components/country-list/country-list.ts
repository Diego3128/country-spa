import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/rest-countries.interfaces';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-country-list',
  imports: [DecimalPipe],
  templateUrl: './country-list.html',
})
export class CountryList {
  countries = input.required<Country[]>()
}
