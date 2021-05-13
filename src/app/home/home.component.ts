import { Component, OnInit } from '@angular/core';
import { IBloc } from '../interfaces/bloc/bloc';
import { BlocService } from '../services/bloc/bloc.service';
declare var $ : any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  FullList: IBloc[];
  RecentList: IBloc[];

  constructor(private service: BlocService) { }

  ngOnInit(): void {
    this.onGetMultiplesBloc();
  }

  ShowContentExample(Id) {
    $("#Bloc"+Id).modal('show');
  }

  onGetMultiplesBloc() {
    this.service.GetBloc()
    .subscribe(response => {
      this.FullList = response;
    });
    this.service.GetRecentBloc()
    .subscribe(response => {
      this.RecentList = response;
    });
  }

  shiftLeft() {
    $('#FullBloc').carousel('prev');
  }

  shiftRight() {
    $('#FullBloc').carousel('next');
  }
}