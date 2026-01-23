import { Component, inject, signal, effect, ResourceRef } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import { Country, Region } from '../../interfaces/rest-countries.interfaces';
import { RegionItem } from './region-item/region-item';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-region',
  imports: [CountryList, RegionItem],
  templateUrl: './by-region.html',
})
export class ByRegion {

  countryService = inject(CountryService);

  public regionList: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  selectedRegion = signal<string | null>(null);

  regionResource: ResourceRef<Country[] | undefined> = rxResource({
    params: () => ({ regionParam: this.selectedRegion() }),
    stream: ({ params, abortSignal, previous }) => {
      if (!params.regionParam) return of([]);
      return this.countryService.getCountriesByRegion(params.regionParam);
    }
  })

  value = effect(() => {
    console.log(this.selectedRegion());
    if (this.regionResource.hasValue()) {
      console.log(this.regionResource.value());
    }
  })

}
