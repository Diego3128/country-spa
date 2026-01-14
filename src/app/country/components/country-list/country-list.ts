import { Component, computed, input } from '@angular/core';
import { Country } from '../../interfaces/rest-countries.interfaces';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { Loader } from "../../../shared/components/loader/loader";
import { ErrorMessage } from "../../../shared/components/error-message/error-message";

@Component({
  selector: 'app-country-list',
  imports: [DecimalPipe, RouterLink, Loader, ErrorMessage],
  templateUrl: './country-list.html',
})
export class CountryList {
  tableCaption = input("Table");
  countries = input.required<Country[]>()
  errorMessage = input<string | undefined | unknown>(undefined);
  isLoading = input<boolean>(false);

  errorString = computed(() => {
    const error = this.errorMessage();
    return typeof error === "string" ? error : null;
  })
}
