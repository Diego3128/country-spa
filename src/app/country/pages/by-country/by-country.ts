import { Component, effect, inject, resource, signal } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import { CountrySearch } from '../../components/country-search/country-search';
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country',
  imports: [CountryList, CountrySearch],
  templateUrl: './by-country.html',
})
export class ByCountry {

  countryService = inject(CountryService);

  search = signal<string>('')

  // countryResource = resource({
  //   params: () => ({ query: this.search() }),
  //   loader: async ({ params, previous, abortSignal }) => {
  //     if (!params.query) return Promise.resolve([]);
  //     return firstValueFrom(this.countryService.searchCountriesByName(params.query));
  //   }
  // });

  countryResource = rxResource({
    params: () => ({ query: this.search() }),
    stream: ({ params, abortSignal, previous }) => {
      if (!params.query) return of([]);
      return this.countryService.searchCountriesByName(params.query);
    }
  });

  hello = effect(() => {
    if (this.countryResource.hasValue()) {
      const result = this.countryResource.value();
      console.log({ result });
    }
  })
}
