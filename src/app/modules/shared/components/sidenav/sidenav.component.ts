import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit{

  mobileQuery: MediaQueryList;
  username: any;


  menuNav = [
    { name: 'Home', icon: 'home', route: 'home' },
    { name: 'Categorias', icon: 'category', route: 'category' },
    { name: 'Productos', icon: 'production_quantity_limits', route: 'product' },
  ]

  constructor(
    media: MediaMatcher,
    private keycloakService: KeycloakService
  ) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  ngOnInit(): void {
    this.username = this.keycloakService.getUsername();
  }

  logout() {
    this.keycloakService.logout();
  }

}
