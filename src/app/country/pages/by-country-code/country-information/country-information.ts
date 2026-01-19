import { Component, computed, input, signal } from '@angular/core';
import { Country } from '../../../interfaces/rest-countries.interfaces';
import { DecimalPipe, KeyValuePipe, DatePipe } from '@angular/common';
import { CountryService } from '../../../services/country.service';
import { NeighboringCountryList } from "./neighboring-country-list/neighboring-country-list";

@Component({
    selector: 'app-country-information',
    imports: [DecimalPipe, KeyValuePipe, DatePipe, NeighboringCountryList],
    templateUrl: './country-information.html',
})
export class CountryInformation {

    country = input.required<Country>();

    currentTime = signal(new Date());

    neighboringCountriesCodes = computed(() => {
        return this.country().borders ?? [];
    });
    //

}