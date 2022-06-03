import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-boarding',
  templateUrl: './boarding.component.html',
  styleUrls: ['./boarding.component.scss'],
})
export class BoardingComponent implements OnInit, OnDestroy {

  constructor(
    private renderer: Renderer2,
    private router: Router) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'boarding');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'boarding');
  }

  next(type: string) {
    this.router.navigate(['boarding/' + type]);
  }

}
