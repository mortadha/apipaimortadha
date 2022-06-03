import { Component, OnInit, Renderer2, OnDestroy, OnChanges, AfterViewChecked, AfterContentChecked, DoCheck } from '@angular/core';
import { trigger, transition, style, query, group, animate } from '@angular/animations';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';
import { BoardingFreelanceService } from '../../freelance/service/boarding.freelance.service';

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
  selector: 'app-boarding-freelance',
  templateUrl: './boarding-freelance.component.html',
  styleUrls: ['./boarding-freelance.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class BoardingFreelanceComponent implements OnInit, OnDestroy, DoCheck {
  public step = 0;

  constructor(
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router,
    private boardingService: BoardingFreelanceService) {
    if (this.route.snapshot.firstChild.data['animation'] > 1) {
      this.router.navigate([`/boarding/freelance`]);
    }
  }

  ngOnInit() {
    this.renderer.addClass(document.body, 'boarding');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'boarding');
  }

  prepareRoute(outlet: RouterOutlet) {
    this.step = outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    return this.step;
  }

  ngDoCheck() {
    if (this.step >= 5 && (this.boardingService.getCurrentBoardingFreelance() === undefined
      || this.boardingService.getCurrentBoardingFreelance().id === undefined)) {
      this.router.navigate([`/boarding/freelance`]);
    }
  }
}
