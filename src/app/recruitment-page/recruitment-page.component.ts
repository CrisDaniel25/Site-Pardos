import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Guid } from '../administration/helpers/Guid';
import { IPositions } from '../interfaces/positions/positions';
import { PositionsService } from '../services/positions/positions.service';
import { RecruitmentService } from '../services/recruitment/recruitment.service';

@Component({
  selector: 'app-recruitment-page',
  templateUrl: './recruitment-page.component.html',
  styleUrls: ['./recruitment-page.component.css']
})
export class RecruitmentPageComponent implements OnInit {

  RecruitmentForm: FormGroup;
  PositionList: IPositions[];

  @ViewChild('fileInput',{static: false}) fileInput: ElementRef

  fileName = "";
  file_path = "";

  constructor(private service: RecruitmentService, private Positionservice: PositionsService) { }

  ngOnInit(): void {
    this.InitForm(); 
    this.GetPositions();
  }

  GetPositions() {
    this.Positionservice.GetPositions()
    .subscribe(response => {
      this.PositionList = response;
    });
  }

  InitForm() {
    this.RecruitmentForm = new FormGroup({
      recruitmentId: new FormControl(0),
      name: new FormControl(null),
      lastname: new FormControl(null),
      phone_number: new FormControl(null),
      email: new FormControl(null),
      weight: new FormControl(null),
      height: new FormControl(null),
      identification_card: new FormControl(null),
      positionId: new FormControl(0),
      certificate_path: new FormControl(null)
    });
  }

  onClearForm() {
    this.RecruitmentForm.reset();
    this.RecruitmentForm.get('recruitmentId').setValue(0);
  }

  onSelectFile(event: any) {
    const file = <File>event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event)=> {
        this.fileName = Guid.newGuid() + "-" + file.name.toString().trim().replace(' ','');
        this.file_path = environment.URL_PATH_RECRUITMENT_IMAGE + "/" + this.fileName;
        this.RecruitmentForm.get('certificate_path').setValue(this.file_path);
      }
    }
  }

  onCreateBloc() {
    const media = this.fileInput.nativeElement.files[0];
    if (media) {
      const file = new FormData();
      file.append('file', media, this.fileName);
      this.service.UploadMultimediaFile(file)
      .subscribe(response => {
        const request = this.RecruitmentForm.value;
        this.service.SendRecruitment(request)
        .subscribe(response => {
          this.message('success', "Tu solicitud para formar parte de Pardos Santo Domingo ha sido guardada con éxito...");
          this.onClearForm();
        }, error => {
          this.message('warning', "Error al administrar sus datos, verifique e intente enviarnos su solicitud nuevamente...");
          this.onClearForm();
        });
      }); 
    }
    else {
      this.message('warning', 'Para enviarnos su solicitud, asegúrese de adjuntar el archivo requerido.');
    }
  }

  message(icon, message) {
    Swal.fire({
      position: 'center',
      icon: icon,
      title: message,
      showConfirmButton: false,
      timer: 3500
    });
  }
}
