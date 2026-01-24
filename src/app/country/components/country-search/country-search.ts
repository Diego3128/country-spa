import { AfterViewInit, Component, ElementRef, input, OnDestroy, output, viewChild } from '@angular/core';
import { debounceTime, fromEvent, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-country-search',
  imports: [],
  templateUrl: './country-search.html',
})
export class CountrySearch implements AfterViewInit, OnDestroy {
  newSearch = output<string>(); //event emitter

  placeholder = input<string>('Search');

  initialValue = input<string>('');

  onSearch = (value: string = '') => {
    if (!value) return;
    this.newSearch.emit(value);
  };

  textInputRef = viewChild<ElementRef<HTMLInputElement>>("txtSearch");

  subscription?: Subscription;


  ngAfterViewInit(): void {
    // clean prev
    if (this.subscription && !this.subscription.closed) this.subscription.unsubscribe();
    //create observable
    const textSource = fromEvent<InputEvent>(this.textInputRef()?.nativeElement!, 'input');
    // create observer and get subscription
    this.subscription = textSource.pipe(
      debounceTime(1000),
      map((inputEvent) => {
        const target = inputEvent.target as HTMLInputElement | null;
        return target?.value.toLowerCase() ?? '';
      })
    ).subscribe({
      next: (value) => {
        this.onSearch(value);
      }
    })
  }
  ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) this.subscription.unsubscribe();
  }
}
