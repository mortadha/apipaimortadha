import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Services
import { NeedService } from '@app/core/services';
import { NeedDTO } from '@neadz/dtos';

enum NeedsTabs {
  open = 0,
  close = 1
}
@Component({
  selector: 'app-needs',
  templateUrl: './needs.component.html',
  styleUrls: ['./needs.component.scss']
})
export class NeedsComponent implements OnInit, OnDestroy {

  private componentDestroy = new Subject();
  public needs: NeedDTO[];
  private total: number;
  isLoading = false;
  previousText = '';
  params = {};
  activeTab = NeedsTabs.open;
  tabsType = NeedsTabs;
  stats = [];

  constructor(
    private needService: NeedService
  ) {

  }

  ngOnInit() {
    this.params = { status: this.activeTab };
    this.fetchNeeds();
  }

  fetchNeeds() {
    this.needService.getAll(this.params)
    .pipe(takeUntil(this.componentDestroy))
    .subscribe((result) => {
      this.stats = [
        { title: 'Total', value: result.total },
      ];
      this.needs = result.data;
      this.total = result.total;
    });
  }

  ngOnDestroy() {
    this.componentDestroy.next();
    this.componentDestroy.unsubscribe();
  }

  searchNeed($event) {
    const text = $event.target.value;
    if (text.length === 0) {
      delete this.params['keywords'];
      this.previousText = '';
      this.fetchNeeds();
    }

    // Limiter, call api after 2 characters
    if (Math.abs(text.length - this.previousText.length) >= 2) {
      this.params['keywords'] = text;
      this.previousText = text;
      this.fetchNeeds();
    }
  }

    /**
   * Called when user wants to change a tab
   * @param {NeedTab} tab
   */
  selectTab(tab: NeedsTabs) {
    if (tab !== this.activeTab) {
      this.activeTab = tab;
      this.params['status'] = this.activeTab;
      this.fetchNeeds();
    }
  }


  onScroll () {
    if (this.needs.length !== this.total && this.isLoading === false) {
      this.isLoading = true;
      this.needService.getAllNext()
      .pipe(takeUntil(this.componentDestroy))
      .subscribe((result) => {
        this.isLoading = false;
        this.needs = [...this.needs,
        ... result.data];
      });
    }
  }
}
