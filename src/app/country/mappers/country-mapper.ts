import { BasicCountryInfo, Country } from "../interfaces/rest-countries.interfaces";

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
      borders: object.borders ?? []
    }
    return country;
  }

  public static mapResponseToCountries(reponse: any[]): Country[] {
    return reponse.map(this.getCountry);
  }

  private static getBasicCountry(object: any): BasicCountryInfo {
    const country: BasicCountryInfo = {
      name: object.name,
      cca2: object.cca2,
      flags: object.flags
    }
    return country;
  }
  public static mapResponseToBasicCountry(reponse: any[]): BasicCountryInfo[] {
    return reponse.map(this.getBasicCountry);
  }
}
