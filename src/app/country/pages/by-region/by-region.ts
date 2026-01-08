import { Component } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import { CountrySearch } from '../../components/country-search/country-search';

@Component({
  selector: 'app-by-region',
  imports: [CountryList, CountrySearch],
  templateUrl: './by-region.html',
})
export class ByRegion {
  onSearchRegion = (search: string) => {
    console.log({ search });
  };
}
