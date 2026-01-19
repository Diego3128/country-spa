import { Location } from '@angular/common';
import { Component, inject, input } from '@angular/core';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
})
export class NotFound {

  location = inject(Location);

  message = input<string>("resource not found");

  goBack() {
    this.location.back();
  }
};
