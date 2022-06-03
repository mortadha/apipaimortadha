import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MissionDTO, MediaDTO } from '@neadz/dtos';
import { Subject } from 'rxjs';
import { UserService, StrongBoxService } from '@app/core/services';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
})
export class DocumentListComponent implements OnInit, OnDestroy {
  @Input() currentMission: MissionDTO;
  public documentsFiles: MediaDTO[];
  private componentDestroyed = new Subject();

  constructor(
    private userService: UserService,
    private strongBoxService: StrongBoxService) {}

  ngOnInit() {
    if (this.userService.isFreelance()) {
      this.strongBoxService.getListMissionFreelanceDocuments(this.currentMission.id)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((documents: MediaDTO[]) => {
        this.documentsFiles = documents;
      });
    } else if (this.userService.isAgent()) {
      this.strongBoxService.getStrongboxAgent(this.currentMission.id, this.currentMission.freelance.id)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((documents: MediaDTO[]) => {
        this.documentsFiles = documents;
      });
    } else if (this.userService.isClient()) {
      this.strongBoxService.getCompanyStrongboxForMission(this.currentMission.id)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((documents: MediaDTO[]) => {
        this.documentsFiles = documents;
      });
    }
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }
}
