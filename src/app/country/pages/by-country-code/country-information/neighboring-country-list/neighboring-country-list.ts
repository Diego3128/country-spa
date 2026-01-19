import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { tap, switchMap, of, forkJoin, finalize } from 'rxjs';
import { BasicCountryInfo } from '../../../../interfaces/rest-countries.interfaces';
import { CountryService } from '../../../../services/country.service';
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-neighboring-country-list',
    imports: [RouterLink],
    templateUrl: './neighboring-country-list.html',
})
export class NeighboringCountryList {

    countryService = inject(CountryService);

    neighboringCountriesCodes = input.required<string[]>();

    isLoadingNeighbors = signal(false);

    // signal that resolves when all requests finish
    neighboringCountriesData = toSignal(toObservable(this.neighboringCountriesCodes).pipe(
        tap(() => this.isLoadingNeighbors.set(true)),
        switchMap((codes) => {
            // empty or null codes
            if (!codes || codes.length === 0) {
                this.isLoadingNeighbors.set(false)
                return of([]);
            }
            // Map each code to an Observable request
            const requests = codes.map((code) => this.countryService.getBasicCountryByCode(code));
            // forkJoin (Promise.all of RxJS)// waits for all Observables to complete and emits the array of results
            return forkJoin(requests).pipe(finalize(() => this.isLoadingNeighbors.set(false)))
        })
    ), { initialValue: [] as BasicCountryInfo[] })
    // 
    filteredNeighboringCountries = computed(() => {
        const countries = this.neighboringCountriesData() ?? [];
        // remove nulls
        return countries.filter((country) => country !== null) as BasicCountryInfo[];
    })

    // hello = effect(() => {
    //     console.log(this.filteredNeighboringCountries());
    // })
}
