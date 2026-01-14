import { Component, effect, inject, resource, signal } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import { CountrySearch } from '../../components/country-search/country-search';
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-capital',
  imports: [CountryList, CountrySearch],
  templateUrl: './by-capital.html',
})
export class ByCapital {
  countryService = inject(CountryService);

  searchValue = signal<string>('');

  // countryResource = resource({
  //   params: () => ({ search: this.searchValue() }),
  //   loader: async ({ params, abortSignal, previous }) => {
  //     if (!params.search) return [];
  //     return firstValueFrom(this.countryService.searchCountriesByCapital(params.search))
  //   }
  // });

  countryResource = rxResource({
    params: () => ({ search: this.searchValue() }),
    stream: ({ params, abortSignal, previous }) => {
      if (!params.search) return of([]);
      return this.countryService.searchCountriesByCapital(params.search)
    }
  })
}
