import { Component } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import { CountrySearch } from '../../components/country-search/country-search';

@Component({
  selector: 'app-by-capital',
  imports: [CountryList, CountrySearch],
  templateUrl: './by-capital.html',
})
export class ByCapital {
  onSearchCapital = (search: string) => {
    console.log({ search });
  };
}
