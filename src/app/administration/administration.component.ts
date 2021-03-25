import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  GotoBlocManagement() {
    this.route.navigate(['administration/bloc']);
  }

  GotoInfocManagement() {
    this.route.navigate(['administration/info']);
  }

  GotoSponsorsManagement() {
    this.route.navigate(['administration/team']);
  }

  GotoTeamManagement() {
    this.route.navigate(['administration/sponsors']);
  }

}
