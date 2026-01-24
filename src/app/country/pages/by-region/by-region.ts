import { Component, inject, effect, ResourceRef, linkedSignal } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import { Country, Region } from '../../interfaces/rest-countries.interfaces';
import { RegionItem } from './region-item/region-item';
import { CountryService } from '../../services/country.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map, of } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';


const isValidRegion = (region: string | null, regionList: Region[]): boolean => {
  if (region) return regionList.includes((region as Region))
  return false;
}

@Component({
  selector: 'app-by-region',
  imports: [CountryList, RegionItem],
  templateUrl: './by-region.html',
})
export class ByRegion {

  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  public regionList: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  queryValue = toSignal(this.activatedRoute.queryParamMap.pipe(
    map((value) => (value as ParamMap).get('region') ?? null),
    map((region) => isValidRegion(region, this.regionList) ? region : null)
  ), { initialValue: null });

  selectedRegion = linkedSignal<string | null>(() => this.queryValue());

  private readonly syncSelectedRegion = effect(() => {
    const urlQueryValue = this.queryValue();
    const newQuery = this.selectedRegion();

    if (newQuery !== urlQueryValue) {
      this.router.navigate(['country', 'by-region'], {
        queryParams: { region: newQuery }, // if null, query is deleted from the URL
        queryParamsHandling: 'merge',
        replaceUrl: false
      })
    }
  })


  regionResource: ResourceRef<Country[] | undefined> = rxResource({
    params: () => ({ regionParam: this.selectedRegion() }),
    stream: ({ params, abortSignal, previous }) => {
      if (!params.regionParam) return of([]);
      return this.countryService.getCountriesByRegion(params.regionParam);
    }
  })

  // value = effect(() => {
  //   console.log(this.selectedRegion());
  //   if (this.regionResource.hasValue()) {
  //     console.log(this.regionResource.value());
  //   }
  // })

}
