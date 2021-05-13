import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICedula } from 'src/app/interfaces/cedula/cedula';
import { IRecruitment } from 'src/app/interfaces/recruitment/recruitment';
import { CedulaService } from 'src/app/services/cedula/cedula.service';
import { RecruitmentService } from 'src/app/services/recruitment/recruitment.service';
declare var $ : any;

@Component({
  selector: 'app-recruitment-management',
  templateUrl: './recruitment-management.component.html',
  styleUrls: ['./recruitment-management.component.css']
})
export class RecruitmentManagementComponent implements OnInit {

  RecruitmentList: IRecruitment[];
  Person: ICedula;

  constructor(private route: Router, private service: RecruitmentService, private serviceCedula: CedulaService) { }

  ngOnInit(): void {
    this.onGetRecruitments();
  }

  ShowContentExample(recruitment) {
    $("#BlocDetails"+recruitment.recruitmentId).modal('show');
    this.serviceCedula.GetPersonByCedula(recruitment.identification_card)
    .subscribe(response => {
      this.Person = response;
    });
  }

  onGetRecruitments() {
    this.service.GetRecruitment()
    .subscribe(response =>{
      this.RecruitmentList = response;
    });
  }

  BacktoMenu() {
    this.route.navigate(['menu/administration']);
  }
}
