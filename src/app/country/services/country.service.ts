import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { Country } from "../interfaces/rest-countries.interfaces";
import { CountryMapper } from "../mappers/country-mapper";

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private readonly apiUrl = 'https://restcountries.com/v3.1/capital';

  http = inject(HttpClient);

  searchCountriesByCapital(capital: string): Observable<Country[]> {
    // return an observable to subscribe somewhere else
    return this.http.get<any[]>(`${this.apiUrl}/${capital}`).pipe(
      map((res) => CountryMapper.mapResponseToCountries(res)),
      catchError((error: HttpErrorResponse) => {
        let message = 'Unexpected error. Try again later';
        if (error.status === 404) {
          message = 'Capital not found';
        }
        return throwError(() => message)
      })
    )
  }
}
