import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '@env/environment';
import { UserService } from './core/services';

declare var gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(private router: Router, private userService: UserService) {
    gtag('config', environment.googleAnalytics, {
      'send_page_view': false
    });
    this.router.events.subscribe(event => {
     if (event instanceof NavigationEnd) {
      const userType = this.userService.isAuthenticated() === true ? this.userService.getCurrentUser().type : 'None';
      gtag('config', environment.googleAnalytics, {
        'page_path': event.urlAfterRedirects,
        'custom_map': {
          'user_type': userType
        }
      });
     }
   });
 }

  public event(eventName: string, params: {}) {
    gtag('event', eventName, params);
  }
}
