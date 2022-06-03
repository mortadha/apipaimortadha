import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-freelance-entreprise',
  templateUrl: './freelance-entreprise.component.html',
  styleUrls: ['./freelance-entreprise.component.scss']
})
export class FreelanceEntrepriseComponent {
  // tslint:disable-next-line:no-any
  public routeLinks: any[];
  public activeLinkIndex = -1;

  constructor(private router: Router) {
    this.routeLinks = [
      {
          label: 'Coordonnées Perso',
          link: 'perso',
          control: 'pills-perso',
          index: 0
      }, {
          label: 'Coordonnées Pro',
          link: 'pro',
          control: 'pills-pro',
          index: 1
      },
      {
        label: 'Documents Légaux',
        link: 'legal',
        control: 'pills-legaux',
        index: 2
      },
      {
        label: 'Documents Bancaires',
        link: 'bank',
        control: 'pills-bancaires',
        index: 3
      }
    ];
    this.router.events.subscribe(() => {
      const found = this.routeLinks.find(tab => this.router.url.endsWith(`${tab.link})`));
      if (found) {
        this.activeLinkIndex = found.index;
      } else {
        this.activeLinkIndex = 0;
      }
    });
  }
}
