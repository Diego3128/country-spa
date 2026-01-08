import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-country-search',
  imports: [],
  templateUrl: './country-search.html',
})
export class CountrySearch {
  newSearch = output<string>(); //event emitter

  placeholder = input<string>('Search');

  onSearch = (value: string = '') => {
    if (!value) return;
    this.newSearch.emit(value);
  };
}
