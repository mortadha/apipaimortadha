import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoaderService } from '@app/core/interceptors/http.interceptor';
import { HttpClient } from '@angular/common/http';

// Services
import { UserService, FreelanceService } from '@app/core/services/';
import { AuthDTO, FreelancePrivateDTO, MediaDTO, AccountDTO, AccountType } from '@neadz/dtos';
import { modalFactory } from '@app/shared/modal/modal.component';
import { CreateContactModalComponent, CreateContactModalData } from '@app/shared/modal/create-contact-modal/create-contact-modal.component';
import { MenuModel, SideItem } from '@app/shared/model/menu.model';
import { AgentProfileModalComponent } from '@app/scenes/agent/profile-agent/modal/agent-profile.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  menu: MenuModel;
  user: AuthDTO;
  currentRoute: string;
  isDropdownOpen = false;
  freelance: FreelancePrivateDTO;
  account: AccountDTO;
  HTTPActivity: boolean;
  items: SideItem[] = [];

  constructor(private userService: UserService,
    private freelanceService: FreelanceService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private dialog: MatDialog,
    public loaderService: LoaderService,
    private http: HttpClient) {
    this.freelance = new FreelancePrivateDTO();
    this.freelance.account = new AccountDTO();
    this.menu = new MenuModel();

    this.userService.listen().subscribe((res: AccountDTO) => {
      this.account = res;
    });
  }

  ngOnInit() {
    this.currentRoute = window.location.pathname;
    this.user = this.userService.getCurrentUser();
    if (this.user && this.user.type === AccountType.Freelance) {
      this.freelance = this.userService.getFreelance();
    }
    this.account = this.userService.getAccount();
    if (this.user) {
      this.items = this.menu.loadItems(this.user.type).map((el) => {
        if (el.link === this.currentRoute) {
          el.isActive = true;
        }
        return el;
      });
    }
  }

  ngOnDestroy() { }

  /**
   * Tell if user has a profile picture
   */
  hasProfilePicture(): boolean {
    return (this.account &&
      this.account.profilePicture &&
      this.account.profilePicture.url &&
      this.account.profilePicture.url.length > 0);
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/auth/login');
  }

  /**
   * Open modal to show freelance details
   */
  showDetails() {
    // const modal = modalFactory<MainProfileDataModalComponent>(this.dialog);
    // modal.open({}, MainProfileDataModalComponent);
  }

  edit() {
    const data: CreateContactModalData = {
      company: this.userService.getCompany(),
      isNew: false,
      account: this.account
    };
    const modal = modalFactory<CreateContactModalComponent>(this.dialog);
    modal.open<CreateContactModalData>(data, CreateContactModalComponent, (result: AccountDTO) => {
      if (result) {
        this.account = result;
        this.userService.setAccount(result);
      }
    });
  }

  navbarToggle() {
    const div = document.querySelector('main');
    if (Array.from(div.classList).indexOf('open-menu') === -1) {
      div.classList.add('open-menu');
    } else {
      div.classList.remove('open-menu');
    }
  }

  agentProfile() {
    const modal = modalFactory<AgentProfileModalComponent>(this.dialog);
    modal.open({}, AgentProfileModalComponent);
  }

  closeUserInfo() {
    if (this.isDropdownOpen === true) {
      this.isDropdownOpen = false;
    }
  }
}
