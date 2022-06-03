import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class LoaderService {
    public isLoading = new BehaviorSubject(false);

    constructor() {}
}

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<object>[] = [];

  constructor(private loaderService: LoaderService) { }

  removeRequest(req: HttpRequest<object>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);

    }
    this.loaderService.isLoading.next(this.requests.length > 0);
  }

  intercept(req: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
    this.requests.push(req);
    this.loaderService.isLoading.next(true);
    return Observable.create(observer => {
      const subscription = next.handle(req)
        .subscribe(
        event => {
          if (event instanceof HttpResponse) {
            this.removeRequest(req);
            observer.next(event);
          }
        },
        err => { this.removeRequest(req); observer.error(err); },
        () => { this.removeRequest(req); observer.complete(); });
      // teardown logic in case of cancelled requests
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
