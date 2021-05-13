import { Component, OnInit } from '@angular/core';
import { ISponsors } from '../interfaces/sponsors/sponsors';
import { SponsorsService } from '../services/sponsors/sponsors.service';

@Component({
  selector: 'app-sponsors-page',
  templateUrl: './sponsors-page.component.html',
  styleUrls: ['./sponsors-page.component.css']
})
export class SponsorsPageComponent implements OnInit {

  FullList: ISponsors[];
  RecentList: ISponsors[];

  constructor(private service: SponsorsService) { }

  ngOnInit(): void {
    this.onGetSponsor();
  }

  onGetSponsor() {
    this.service.GetSponsor()
    .subscribe(response => {
      this.FullList = response;
    });
    this.service.GetRecentSponsor()
    .subscribe(response => {
      this.RecentList = response;
    });
  }
}
