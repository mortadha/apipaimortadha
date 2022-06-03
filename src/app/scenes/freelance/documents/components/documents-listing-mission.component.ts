import { Component, OnInit, Input } from '@angular/core';
import { MissionDTO, MediaDTO } from '@neadz/dtos';
import { StrongBoxService } from '@app/core/services';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-documents-listing-mission',
  templateUrl: './documents-listing-mission.component.html',
  styleUrls: ['./documents-listing-mission.component.scss']
})
export class DocumentListingMissionComponent implements OnInit {
  @Input() mission: MissionDTO;
  documents: MediaDTO[];
  componentDestroy = new Subject;
  constructor(
    private strongboxService: StrongBoxService
  ) { }

  ngOnInit() {
    this.strongboxService.getListMissionFreelanceDocuments(this.mission.id)
    .pipe(takeUntil(this.componentDestroy))
    .subscribe((medias: MediaDTO[]) => {
      this.documents = medias;
    });
  }

}
