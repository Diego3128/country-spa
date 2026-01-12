import { Component, inject, signal } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import { CountrySearch } from '../../components/country-search/country-search';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/rest-countries.interfaces';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-by-capital',
  imports: [CountryList, CountrySearch],
  templateUrl: './by-capital.html',
})
export class ByCapital {
  countryService = inject(CountryService);

  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
  countries = signal<Country[]>([]);

  onSearchCapital = (search: string) => {
    this.isLoading.set(true);
    this.error.set(null);
    this.countryService.searchCountriesByCapital(search).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        this.countries.set(response);
      }, error: (error: string) => {
        console.log({ error });
        this.isLoading.set(false);
        this.error.set(error);
      }
    })
  };
}
