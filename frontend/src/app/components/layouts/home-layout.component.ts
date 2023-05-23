import { Component } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  template: `
    <app-app-bar></app-app-bar>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class HomeLayoutComponent {

}
