import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { takeUntil, mergeMap, tap } from 'rxjs/operators';
import * as Sentry from '@sentry/browser';
import jwtDecode from 'jwt-decode';

import { ApiService } from '@app/core/services/api.service';

import { AuthDTO, LoginDTO, AccountType, FreelancePrivateDTO, CompanyPublicDTO, AccountDTO, CompanyPrivateDTO } from '@neadz/dtos';
import { CompanyService } from './company.service';
import { FreelanceService } from './freelance.service';
import { AgentService } from './agent.service';
interface IDecodedToken {
  iat: number;
  exp: number;
  type: string;
}

// tslint:disable-next-line:no-any
declare var $crisp: any;
declare var gtag: Function;

@Injectable()
export class UserService {

  CURRENT_USER = 'CURRENT';

  private currentUser: AuthDTO;
  private currentFreelance: FreelancePrivateDTO;
  private currentCompany: CompanyPublicDTO;
  private currentAccount: AccountDTO;

  private unsubscribe = new Subject();

  private _listeners = new Subject();

  constructor(private http: ApiService,
    private freelanceService: FreelanceService,
    private companyService: CompanyService,
    private agentService: AgentService) {
    this.currentUser = null;
    this.currentAccount = null;
    this.http = http;
  }

  isLogged(): boolean {
    return (this.currentUser !== null);
  }

  isClient(): boolean {
    return (this.currentUser !== null && this.currentUser.type === AccountType.Company);
  }

  isFreelance(): boolean {
    return (this.currentUser !== null && this.currentUser.type === AccountType.Freelance);
  }

  isAgent(): boolean {
    return (this.currentUser !== null && this.currentUser.type === AccountType.Agent);
  }

  // get current user if logged in
  getCurrentUser(): AuthDTO|null {
    if (this.currentUser !== null) {
      return this.currentUser;
    }
    return this._getCurrentUserStored();
  }

  getCompany(): CompanyPublicDTO|null {
    return this.currentCompany;
  }

  getFreelance(): FreelancePrivateDTO|null {
    return this.currentFreelance;
  }

  setFreelance(freelance: FreelancePrivateDTO) {
    this.currentFreelance = freelance;
  }

  getAccount(): AccountDTO | null {
    return this.currentAccount;
  }

  setAccount(account: AccountDTO) {
    this.currentAccount = account;
    this._listeners.next(account);
  }

  _getCurrentUserStored(): AuthDTO|null {
    const data = localStorage.getItem(this.CURRENT_USER);
    if (data === null) {
      return null;
    }
    let result: AuthDTO = null;
    try {
      // TODO: Add Security Check On JWT
      result = JSON.parse(data);
    } catch {}
    this.currentUser = result;
    return result;
  }

  login(username: string, password: string): Observable<AuthDTO> {
    const loginObs: Observable<AuthDTO> = new Observable((observer) => {
      const login = new LoginDTO();
      login.email = username;
      login.password = password;
      this.http.post<AuthDTO>(`accounts/login`, login)
      .pipe(mergeMap((res: AuthDTO) => {
        if (res['message'] !== undefined) {
          observer.error(res['message']);
        } else {
          this.currentUser = res;
          localStorage.setItem(this.CURRENT_USER, JSON.stringify(res));
          this.configureUserInfo(username);
        }
        return this.userDataObservable();
      }))
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        observer.next(this.currentUser);
        observer.complete();
      }, (res: HttpErrorResponse) => {
        observer.error(res);
      });
    });
    return loginObs;
  }

  /**
   * Current User
   */
  configureUserInfo(email: string) {
    gtag('set', {'user_id': this.currentUser.accountId});
    // Sentry
    Sentry.configureScope((scope) => {
      scope.setUser({
        'id': this.currentUser.accountId,
        'email': email,
      });
    });
    // Crisp Chat Box
    if (this.currentUser.type === AccountType.Agent) {
      $crisp.push(['do', 'chat:hide']);
    } else {
      $crisp.push(['set', 'user:email', email]);
      $crisp.push(['set', 'user:nickname', [`${this.currentUser.firstName} ${this.currentUser.lastName}`]]);
    }
  }

  /**
   * Return right observable to fetch user data
   */
  userDataObservable() {
    if (!this.currentUser) {
      return of({});
    }
    if (this.currentUser.type === AccountType.Freelance) {
      return this.freelanceService
      .getMe()
      .pipe(tap((res: FreelancePrivateDTO) => {
        this.currentFreelance = res;
        this.currentAccount = res.account;
      }));
    } else if (this.currentUser.type === AccountType.Company) {
      return this.companyService
      .getMe()
      .pipe(tap((res: CompanyPrivateDTO) => {
        this.currentCompany = res;
        this.currentAccount = res.accounts[0];
      }));
    } else if (this.currentUser.type === AccountType.Agent) {
      return this.agentService.getMe().pipe(tap((res: AccountDTO) => {
        this.currentAccount = res;
      }));
    }
    return of({});
  }

  isAuthenticated(): boolean {
    const user = this.getCurrentUser();
    if (user) {
      const payload: IDecodedToken = jwtDecode(user.token);
      if (payload.exp * 1000 > Date.now()) {
        return true;
      }
    }
    return false;
  }

  isAuthenticatedAs(expectedRole: string): boolean {
    const user = this.getCurrentUser();
    if (user) {
      const payload: IDecodedToken = jwtDecode(user.token);
      if (payload.exp * 1000 > Date.now() && expectedRole === user.type) {
        return true;
      }
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.CURRENT_USER);
    this.currentUser = null;
  }

  updatePassword(recoveryToken: string, password: string) {
    return this.http.post('accounts/passwordreset', {recoveryToken: recoveryToken, password: password});
  }

  createPassword(recoveryToken: string, password: string) {
    return this.http.post('accounts/passwordcreate', {recoveryToken: recoveryToken, password: password});
  }

  lostPassword(email: string) {
    return this.http.post('accounts/passwordlost', {email: email});
  }

  listen() {
    return this._listeners.asObservable();
  }

  resendMail(userId) {
    return this.http.get(`accounts/resendMail/${userId}`);
  }
}
