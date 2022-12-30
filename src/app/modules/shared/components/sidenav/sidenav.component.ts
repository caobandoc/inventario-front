import { MediaMatcher } from '@angular/cdk/layout';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  mobileQuery: MediaQueryList;

  menuNav = [
    { name: 'Home', icon: 'home', route: 'home' },
    { name: 'Categorias', icon: 'category', route: 'home' },
    { name: 'Productos', icon: 'production_quantity_limits', route: 'home' },
  ]

  constructor(
    media: MediaMatcher
  ) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

}
