export interface Country {
  name: Name;
  independent: boolean;
  status: string;
  cca2: string,
  currencies: Currencies;
  capital: string[];
  region: string;
  languages: Languages;
  translations: Translations;
  flag: string;
  maps: Maps;
  population: number;
  fifa?: string;
  continents: string[];
  flags: Flags;
}

export interface Name {
  common: string;
  official: string;
  nativeName: {
    [key: string]: {
      official: string;
      common: string;
    }
  };
}

export interface Currencies {
  [key: string]: {
    symbol: string;
    name: string;
  }
}

export interface Languages {
  [key: string]: string
}

export interface Translations {
  [key: string]: {
    official: string;
    common: string;
  }
}
type Url = string;

export interface Maps {
  googleMaps: Url;
  openStreetMaps: Url;
}

export interface Flags {
  png: string;
  svg: string;
  alt?: string;
}
