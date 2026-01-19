import { Component, input } from '@angular/core';

@Component({
    selector: 'app-country-information-loader',
    imports: [],
    templateUrl: './country-information-loader.html',
})
export class CountryInformationLoader {
    isLoading = input<boolean>(false);
}
