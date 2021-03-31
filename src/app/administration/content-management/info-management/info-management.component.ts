import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-management',
  templateUrl: './info-management.component.html',
  styleUrls: ['./info-management.component.css']
})
export class InfoManagementComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  BacktoMenu() {
    this.route.navigate(['menu/administration']);
  }
  
}
