import { Component, effect, inject, linkedSignal, resource, signal } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import { CountrySearch } from '../../components/country-search/country-search';
import { CountryService } from '../../services/country.service';
import { firstValueFrom, map, of } from 'rxjs';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-by-country',
  imports: [CountryList, CountrySearch],
  templateUrl: './by-country.html',
})
export class ByCountry {

  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryValue = toSignal(this.activatedRoute.queryParamMap.pipe(
    map((value) => (value as ParamMap).get('query') ?? '')
  ), { initialValue: '' })

  search = linkedSignal(() => this.queryValue());

  private readonly syncQueryParameter = effect(() => {
    const newValue = this.search();

    if (newValue !== this.queryValue()) {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { query: newValue ?? null },
        queryParamsHandling: 'merge',
        replaceUrl: false,
      })
    }
  })

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
