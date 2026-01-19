import { Routes } from '@angular/router';
import { ByCapital } from './pages/by-capital/by-capital';
import { CountryLayout } from './layouts/country-layout/country-layout';
import { ByCountry } from './pages/by-country/by-country';
import { ByRegion } from './pages/by-region/by-region';
import { ByCountryCode } from './pages/by-country-code/by-country-code';

const routes: Routes = [
  {
    path: '',
    component: CountryLayout,
    children: [
      {
        path: 'by-capital',
        component: ByCapital,
      },
      {
        path: 'by-country',
        component: ByCountry,
      },
      {
        path: 'by-region',
        component: ByRegion,
      },
      {
        path: 'by-country/:code',
        component: ByCountryCode,
      },
      {
        path: '**',
        redirectTo: 'by-capital',
      },
    ],
  },
  // {
  //   path: '**',
  //   redirectTo: '',
  // },
];

export default routes;
