import { Component } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';

@Component({
  selector: 'app-by-region',
  imports: [CountryList],
  templateUrl: './by-region.html',
})
export class ByRegion {
  onSearchRegion = (search: string) => {
    console.log({ search });
  };
}
