import { Component, effect, inject, linkedSignal, resource, signal } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import { CountrySearch } from '../../components/country-search/country-search';
import { CountryService } from '../../services/country.service';
import { firstValueFrom, map, of, pipe, tap } from 'rxjs';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital',
  imports: [CountryList, CountrySearch],
  templateUrl: './by-capital.html',
})
export class ByCapital {

  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  query = this.activatedRoute.queryParamMap;

  queryValue = toSignal(this.activatedRoute.queryParamMap.pipe(
    map((value) => (value as ParamMap).get('query') ?? ''),
  ), { initialValue: '' });

  // Linked signal: starts with queryValue, but can be updated by children
  searchValue = linkedSignal(() => this.queryValue());

  // Reactively update URL when searchValue changes
  private readonly updateQueryParamEffect = effect(() => {
    // current value
    const newQuery = this.searchValue();
    // only update query param in the URL if the value actually changed
    if (newQuery !== this.queryValue()) {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { query: newQuery || null, example: 12345 }, //if null, the param is rmeoved
        queryParamsHandling: 'merge',
        replaceUrl: false,
      })

    }
  })

  countryResource = rxResource({
    params: () => ({ search: this.searchValue() }),
    stream: ({ params, abortSignal, previous }) => {
      if (!params.search) return of([]);
      return this.countryService.searchCountriesByCapital(params.search)
    }
  })
}
