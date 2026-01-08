import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-by-country-name',
  imports: [],
  templateUrl: './by-country-name.html',
})
export class ByCountryName {
  private route = inject(ActivatedRoute);

  params = toSignal(this.route.params, {
    initialValue: {} as Params,
  });

  countryName = computed(() => {
    return (this.params()?.['code'] as string) ?? '';
  });
}
