import { Component, OnInit, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { UserService } from '@app/core/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { NotificationService, NotificationType } from '@app/core/services/notification.service';
import { passwordValidator } from '@app/shared/validator';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthDTO } from '@neadz/dtos';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})

export class PasswordComponent implements OnInit, OnDestroy {

  password: string;
  passwordCheck: string;
  token: string;
  userId: string;
  @ViewChild('title') title: ElementRef;
  @ViewChild('newMdp') newMdp: ElementRef;
  @ViewChild('cgu') cgu: ElementRef;
  setFirstPassword: boolean = this.route.snapshot.data['setFirstPassword'];
  private componentDestroyed: Subject<AuthDTO>;

constructor(
  private renderer: Renderer2,
  private userService: UserService,
  private notification: NotificationService,
  private route: ActivatedRoute,
  private router: Router) {
}

  ngOnInit() {
    this.renderer.addClass(document.body, 'login');
    this.componentDestroyed = new Subject();
    this.route.queryParams.subscribe((params: Params) => {
      this.token = params['token'];
    });
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
    this.renderer.removeClass(document.body, 'login');
  }

  checkInput() {
    if (this.password !== this.passwordCheck) {
      this.notification.show({
        title: 'Mot de passe',
        message: 'Les mots de passes doivent être identiques',
        type: NotificationType.error
      });
      return false;
    } else if (passwordValidator(this.password)) {
      this.notification.show({
        title: 'Mot de passe',
        message: 'Le mot de passe doit contenir au moins 8 caractères et un chiffre',
        type: NotificationType.error
      });
      return false;
    } else {
      return true;
    }
  }

  update() {
    if (this.checkInput()) {
      if (this.setFirstPassword) {
        this.userService.createPassword(this.token, this.password)
        .pipe(takeUntil(this.componentDestroyed))
        .subscribe((res) => {
          if (!res) {
            this.notification.show({
              title: 'Mot de passe',
              message: 'Le mot de passe a bien été mis à jour',
              type: NotificationType.success
            });
            this.router.navigateByUrl('/auth/login');
          } else {
            this.notification.show({
              title: 'Mot de passe',
              message: 'Un problème est survenu lors de la mise à jour du mot de passe',
              type: NotificationType.error
            });
          }
        }, (error) => {
          this.notification.show({
            title: 'Modification de mot de passe',
            message: error,
            type: NotificationType.error
          });
        });
      } else {
        this.userService.updatePassword(this.token, this.password)
        .pipe(takeUntil(this.componentDestroyed))
        .subscribe((res) => {
          if (!res) {
            this.notification.show({
              title: 'Mot de passe',
              message: 'Le mot de passe a bien été mis à jour',
              type: NotificationType.success
            });
            this.router.navigateByUrl('/auth/login');
          } else {
            this.notification.show({
              title: 'Mot de passe',
              message: 'Un problème est survenu lors de la mise à jour du mot de passe',
              type: NotificationType.error
            });
          }
        }, (error) => {
          this.notification.show({
            title: 'Modification de mot de passe',
            message: error,
            type: NotificationType.error
          });
        });
      }
    }
  }
}
