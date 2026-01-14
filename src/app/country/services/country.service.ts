import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, delay, map, Observable, throwError } from "rxjs";
import { Country } from "../interfaces/rest-countries.interfaces";
import { CountryMapper } from "../mappers/country-mapper";

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private readonly apiUrl = 'https://restcountries.com/v3.1';

  http = inject(HttpClient);

  searchCountriesByCapital(capital: string): Observable<Country[]> {
    // return an observable to subscribe somewhere else
    return this.http.get<any[]>(`${this.apiUrl}/capital/${capital}`).pipe(
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
  //
  searchCountriesByName(query: string): Observable<Country[]> {
    console.log({ query });
    return this.http.get<any[]>(`${this.apiUrl}/name/${query}`)
      .pipe(
        delay(1000),
        map((res) => CountryMapper.mapResponseToCountries(res)),
        catchError((error: HttpErrorResponse) => {
          let message = 'Unexpected error. Try again later';
          if (error.status === 404) {
            message = 'Country not found';
          }
          return throwError(() => message)
        })
      )
  }
}
