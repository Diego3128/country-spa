import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-region-item',
  imports: [],
  templateUrl: './region-item.html',
})
export class RegionItem {

  regionSelected = output<string>();

  regionName = input.required<string>();

  isDisabled = input<boolean>(false);


  selectRegion(region: string) {
    if (!region) return;
    this.regionSelected.emit(region)
  }
}
