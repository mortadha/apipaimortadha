import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MissionDTO } from '@neadz/dtos';
import { ShowCraInteractor } from '../../scene/show-cra.interactor';

@Component({
  selector: 'app-cra-detail',
  templateUrl: './cra-detail.component.html',
  styleUrls: ['./cra-detail.component.scss'],
  providers: [ShowCraInteractor]
})
export class CraDetailComponent implements OnInit {
  @Input() currentMission: MissionDTO;
  @Output() emitDocumentTab = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  getDocumentTab() {
    this.emitDocumentTab.emit();
  }
}
