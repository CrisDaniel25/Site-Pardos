import { Component, OnInit } from '@angular/core';
declare var $ : any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showOptionNavbar: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openMenuBar() {
    $("#navbarContent").collapse("hide") ? $("#navbarContent").collapse("show") : $("#navbarContent").collapse("hide");
  }

}
