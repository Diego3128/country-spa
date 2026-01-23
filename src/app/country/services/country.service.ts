import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, delay, map, Observable, of, tap, throwError } from "rxjs";
import { Country, BasicCountryInfo } from '../interfaces/rest-countries.interfaces';
import { CountryMapper } from "../mappers/country-mapper";

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private readonly apiUrl = 'https://restcountries.com/v3.1';

  http = inject(HttpClient);

  byCapitalCacheResults = new Map<string, Country[]>()

  byCountryCacheResults = new Map<string, Country[]>()

  searchCountriesByCapital(capital: string): Observable<Country[]> {
    capital = capital.toLocaleLowerCase();
    // return cache result if it exists
    if (this.byCapitalCacheResults.has(capital)) {
      // get from cache
      return of(this.byCapitalCacheResults.get(capital) as Country[]);
    }
    // return an observable to subscribe somewhere else
    return this.http.get<any[]>(`${this.apiUrl}/capital/${capital}`).pipe(
      map((res) => CountryMapper.mapResponseToCountries(res)),
      tap((countries) => { this.byCapitalCacheResults.set(capital, countries) }),
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
    query = query.toLocaleLowerCase();

    if (this.byCountryCacheResults.has(query)) {
      // get from cache
      return of(this.byCountryCacheResults.get(query) as Country[])
    }

    return this.http.get<any[]>(`${this.apiUrl}/name/${query}`)
      .pipe(
        delay(1000),
        map((res) => CountryMapper.mapResponseToCountries(res)),
        tap((countries) => { this.byCountryCacheResults.set(query, countries) }),
        catchError((error: HttpErrorResponse) => {
          let message = 'Unexpected error. Try again later';
          if (error.status === 404) {
            message = 'Country not found';
          }
          return throwError(() => message)
        })
      )
  }
  //
  searchCountriesByCode(code: string): Observable<Country | null> {
    // return an observable to subscribe somewhere else
    return this.http.get<any[]>(`${this.apiUrl}/alpha/${code}`).pipe(
      map((res) => CountryMapper.mapResponseToCountries(res)),
      map((countries) => (countries.at(0) ?? null)),
      delay(1000),
      catchError((error: HttpErrorResponse) => {
        // console.log(error);
        let message = 'Unexpected error. Try again later';
        if (error.status === 404) {
          message = `A country with the code '${code}' was not found`;
        }
        return throwError(() => message)
      })
    )
  }
  //
  getBasicCountryByCode(code: string): Observable<BasicCountryInfo | null> {
    return this.http.get<any[]>(`${this.apiUrl}/alpha/${code}`).pipe(
      map((res) => CountryMapper.mapResponseToBasicCountry(res)),
      map((basicCountries) => (basicCountries.at(0) ?? null)),
      delay(1000),
      catchError((error: HttpErrorResponse) => {
        // console.log(error);
        let message = 'Unexpected error. Try again later';
        if (error.status === 404) {
          message = `A country with the code '${code}' was not found`;
        }
        return throwError(() => message)
      })
    )
  }
}
