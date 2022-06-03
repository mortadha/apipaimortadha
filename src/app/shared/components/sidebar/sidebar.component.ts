import { Component, OnInit } from '@angular/core';

// Services
import { UserService } from '@app/core/services/user.service';
import { AuthDTO } from '@neadz/dtos';
import { MenuModel } from '@app/shared/model/menu.model';

class SideItem {
  link: string;
  name: string;
  img: string;
  isActive: boolean;

  constructor(link: string, name: string, img: string) {
    this.link = link;
    this.name = name;
    this.img = img;
    this.isActive = false;
  }
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  menu: MenuModel;
  user: AuthDTO;
  currentRoute: string;
  items: SideItem[] = [];

  constructor(private userService: UserService) {
    this.menu = new MenuModel();
    this.user = this.userService.getCurrentUser();
    this.currentRoute = window.location.pathname;
  }

  ngOnInit() {
    if (this.user) {
      this.items = this.menu.loadItems(this.user.type).map((el) => {
        if (el.link === this.currentRoute) {
          el.isActive = true;
        }
        return el;
      });
    }
  }
}
