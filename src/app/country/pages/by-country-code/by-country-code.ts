import { Component, effect, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { NotFound } from "../../../shared/components/not-found/not-found";
import { CountryInformation } from './country-information/country-information';
import { CountryInformationLoader } from "./country-information-loader/country-information-loader";

@Component({
    selector: 'app-by-country-code',
    imports: [NotFound, CountryInformation, CountryInformationLoader],
    templateUrl: './by-country-code.html',
})
export class ByCountryCode {
    countryService = inject(CountryService);
    // with observables (reactive)
    // private route = inject(ActivatedRoute);
    // params = toSignal(this.route.params, {
    //   initialValue: {} as Params,
    // });

    // code = computed(() => {
    //   return (this.params()?.['code'] as string) ?? '';
    // });

    // with a snapshot // no reactive

    // code = inject(ActivatedRoute).snapshot.paramMap.get("code");

    code = input<string>(); // using withComponentInputBinding()

    countryResource = rxResource({
        params: () => ({ code: this.code() }),
        stream: ({ params, previous, abortSignal }) => {
            if (!params.code || (params.code && params.code.length > 4)) {
                return of(null);
            }
            return this.countryService.searchCountriesByCode(params.code);
        }
    });
    // 
    test = effect(() => {
        if (this.countryResource.hasValue()) {
            console.log(this.countryResource.value());
        }
    })
}
