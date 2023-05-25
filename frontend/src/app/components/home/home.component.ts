import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, pairwise, startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  public destroyed = new Subject<any>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      pairwise(),
      //filter(events => events[0].url === events[1].url),
      startWith('Initial call'),
      takeUntil(this.destroyed)
    ).subscribe(() => {
      this.fetchData();
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next(void 0);
    this.destroyed.complete();
  }

  fetchData() {
    //
  }
}
