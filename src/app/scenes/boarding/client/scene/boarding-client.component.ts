import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { trigger, transition, style, query, group, animate } from '@angular/animations';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';
import { BoardingClientService } from '../service/boarding.client.service';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition(':enter', []), // no need to animate anything on load
        // Previous, slide left to right to show left page
        transition(':decrement', [
          style({ position: 'relative' }),
          query(':enter, :leave', [
            style({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%'
            })
          ]),
          // set new page X location to be -100%
          query(
            ':enter',
            style({
              transform: 'translateX(-100%)',
            }),
          ),

          group([
            // slide existing page from 0% to 100% to the right
            query(
              ':leave',
              animate(
                '500ms ease',
                style({
                  transform: 'translateX(100%)',
                }),
              ),
            ),
            // slide new page from -100% to 0% to the right
            query(
              ':enter',
              animate(
                '500ms ease',
                style({
                  transform: 'translateX(0%)',
                }),
              ),
            ),
          ]),
        ]),

        // Next, slide right to left to show right page
        transition(':increment', [
          style({ position: 'relative' }),
          query(':enter, :leave', [
            style({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%'
            })
          ]),
          // set new page X location to be 100%
          query(
            ':enter',
            style({
              transform: 'translateX(100%)',
            }),
          ),

          group([
            // slide existing page from 0% to -100% to the left
            query(
              ':leave',
              animate(
                '500ms ease',
                style({
                  transform: 'translateX(-100%)',
                }),
              ),
            ),
            // slide new page from 100% to 0% to the left
            query(
              ':enter',
              animate(
                '500ms ease',
                style({
                  transform: 'translateX(0%)',
                }),
              ),
            ),
          ]),
        ]),
  ]);


@Component({
  selector: 'app-boarding-client',
  templateUrl: './boarding-client.component.html',
  styleUrls: ['./boarding-client.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class BoardingClientComponent implements OnInit, OnDestroy {
  public step = 0;

  constructor(
    private renderer: Renderer2,
    private boardingService: BoardingClientService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'boarding');
    if (this.route.snapshot.data['isConsort'] && this.route.snapshot.data['isConsort'] === true) {
      this.boardingService.setIsConsort(true);
    }
    if (this.route.snapshot.firstChild.data['animation'] > 1) {
      const link = (this.boardingService.isConsort() === true) ? 'consort' : 'entreprise';
      this.router.navigate([`/boarding/${link}`]);
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'boarding');
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
