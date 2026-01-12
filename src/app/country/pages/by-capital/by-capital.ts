import { Component, inject, resource, signal } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import { CountrySearch } from '../../components/country-search/country-search';
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-capital',
  imports: [CountryList, CountrySearch],
  templateUrl: './by-capital.html',
})
export class ByCapital {
  countryService = inject(CountryService);

  searchValue = signal<string>('');

  countryResource = resource({
    params: () => ({ search: this.searchValue() }),
    loader: async ({ params, abortSignal, previous }) => {
      if (!params.search) return [];
      return firstValueFrom(this.countryService.searchCountriesByCapital(params.search))
    }
  })
}
