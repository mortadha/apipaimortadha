import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { UserService } from '@app/core/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { NotificationService, NotificationType } from '@app/core/services/notification.service';

@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.component.html',
  styleUrls: ['./lost-password.component.scss'],
})

export class LostPasswordComponent implements OnInit, OnDestroy {

  email: string;
  emailTried: string;
  private componentDestroyed = new Subject();

constructor(
  private renderer: Renderer2,
  private userService: UserService,
  private notification: NotificationService
) {}

ngOnInit() {
  this.renderer.addClass(document.body, 'login');
}

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
    this.renderer.removeClass(document.body, 'login');
  }

  submit() {
    this.userService.lostPassword(this.email)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((result: string) => {
      this.emailTried = this.email;
    }, (error) => {
      this.notification.show({
        title: 'Mot de passe',
        message: error,
        type: NotificationType.error
      });
    });
  }

  clear() {
    this.emailTried = null;
  }
}
