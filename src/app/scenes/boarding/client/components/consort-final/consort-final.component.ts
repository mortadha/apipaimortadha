import { Component, OnInit } from '@angular/core';
import { BoardingClientService } from '../../service/boarding.client.service';

@Component({
  selector: 'app-consort-final',
  templateUrl: './consort-final.component.html',
  styleUrls: ['./consort-final.component.scss']
})
export class ConsortFinalComponent implements OnInit {
  constructor(private boardingService: BoardingClientService) { }

  ngOnInit() {
    this.boardingService.resetNeed();
  }

}
