import { Injectable } from '@angular/core';
import { AccountType } from '@neadz/dtos';
import { environment } from '@env/environment';

/**
 * Menu item representation
 */
export class SideItem {
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

/**
 * Menu Model
 * Generate menu items
 */
@Injectable()
export class MenuModel {
  constructor() {
  }

  /**
   * Load side bar items
   */
  loadItems(type: AccountType): SideItem[] {
    switch (type) {
      case AccountType.Agent:
        return this.agentSideItems();
      case AccountType.Freelance:
        return this.freelanceSideItems();
      case AccountType.Company:
        return this.companySideItems();
    }
    return [];
  }

  /**
   * Freelance side bar items
   */
  freelanceSideItems(): SideItem[] {
    return [
      new SideItem('/freelance/dashboard', 'Mon dashboard', 'fas fa-chimney'),
      new SideItem('/freelance/profile', 'Mon profil', 'fas fa-user'),
      new SideItem('/freelance/entreprise', 'Mon entreprise', 'fas fa-building'),
      new SideItem('/freelance/opportunites', 'Mes opportunités', 'fas fa-paper-plane'),
      new SideItem('/freelance/missions', 'Ma mission', 'fas fa-suitcase'),
      new SideItem('/freelance/documents', 'Mes documents', 'fas fa-file-alt'),
    ];
  }

  /**
   * Agent side bar items
   */
  agentSideItems(): SideItem[] {
    return [
      new SideItem('/agent/dashboard', 'Mon dashboard', 'fas fa-chimney'),
      new SideItem('/agent/freelances', 'Freelances', 'fas fa-user'),
      new SideItem('/agent/besoins', 'Besoins', 'fas fa-paper-plane'),
      new SideItem('/agent/entreprises', 'Entreprises', 'fas fa-building'),
      new SideItem('/agent/missions', 'Missions', 'fas fa-suitcase'),
    ];
  }

  /**
   * Company side bar items
   */
  companySideItems(): SideItem[] {
    const menu = [];
    // if (environment.production !== true) {
    //   menu.push(new SideItem('/entreprise/dashboard', 'Mon dashboard', 'fas fa-chimney'));
    // }
    return [...menu,
      new SideItem('/entreprise/besoins', 'Mes besoins', 'fas fa-paper-plane'),
      new SideItem('/entreprise/freelances', 'Mes freelances', 'fas fa-user'),
      new SideItem('/entreprise/documents', 'Mes documents', 'fas fa-file-alt'),
      // new SideItem('/entreprise/factures', 'Factures', 'sidebar_bills_icon.svg'),
    ];
  }
}
