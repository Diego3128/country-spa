import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.html',
})
export class Loader {
  message = input<string>('loading');
  showLabel = input<boolean>(true);
  labelMessage = input<string>('loading');
}
