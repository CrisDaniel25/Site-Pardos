import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sponsors-management',
  templateUrl: './sponsors-management.component.html',
  styleUrls: ['./sponsors-management.component.css']
})
export class SponsorsManagementComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  BacktoMenu() {
    this.route.navigate(['menu/administration']);
  }

}
