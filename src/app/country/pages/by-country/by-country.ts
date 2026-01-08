import { Component } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import { CountrySearch } from '../../components/country-search/country-search';

@Component({
  selector: 'app-by-country',
  imports: [CountryList, CountrySearch],
  templateUrl: './by-country.html',
})
export class ByCountry {
  onSearchCountry = (search: string) => {
    console.log({ search });
  };
}
