import { Component, OnInit, OnDestroy, Inject, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// Services
import { UserService } from '@app/core/services/user.service';
// DTOS
import { AuthDTO, AccountType } from '@neadz/dtos';
import { NotificationService, NotificationType } from '@app/core/services/notification.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit, OnDestroy {
  username = '';
  password: string;
  private componentDestroyed: Subject<AuthDTO>;
  loginError = false;
  loginForm: FormGroup;
  submitted = false;


  constructor(
    private renderer: Renderer2,
    private userService: UserService,
    private router: Router,
    private notification: NotificationService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(this.username, []),
      'password': new FormControl(this.password, [])
    });
    this.componentDestroyed = new Subject();
    this.renderer.addClass(document.body, 'login');
    }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
    this.renderer.removeClass(document.body, 'login');
  }

  get usernameForm() { return this.loginForm.get('username'); }
  get passwordForm() { return this.loginForm.get('password'); }

  login() {
    this.submitted = true;
    this.userService.login(this.username, this.password)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((value: AuthDTO) => {
      this.notification.show({
        title: 'Authentification',
        message: 'Réussie',
        type: NotificationType.success
      });
      const path = this.pathRedirection(value.type);
      this.router.navigateByUrl(path);
    }, (error) => {
      this.loginError = true;
      this.notification.show({
        title: 'Authentification',
        message: error,
        type: NotificationType.error
      });
    });
  }

  /**
   * Return path redirection after successful login
   */
  pathRedirection(type: AccountType): string {
    let redirect = '/';
    switch (type) {
      case AccountType.Freelance:
      redirect = '/freelance';
      break;

      case AccountType.Agent:
      redirect = '/agent';
      break;

      case AccountType.Company:
      redirect = '/entreprise';
      break;

      case AccountType.Staff:
      redirect = '/admin';
      break;
    }
    return redirect;
  }
}
