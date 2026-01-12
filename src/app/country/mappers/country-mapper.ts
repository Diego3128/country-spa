import { Country } from "../interfaces/rest-countries.interfaces";

export class CountryMapper {

  private static getCountry(object: any): Country {

    const country: Country = {
      name: object.name,
      independent: object.independent,
      status: object.status,
      cca2: object.cca2,
      currencies: object.currencies,
      capital: object.capital,
      region: object.region,
      languages: object.languages,
      translations: object.translations,
      flag: object.flag,
      maps: object.maps,
      population: object.population,
      continents: object.continents,
      flags: object.flags,
    }
    return country;
  }

  public static mapResponseToCountries(reponse: any[]): Country[] {
    return reponse.map(this.getCountry);
  }
}
