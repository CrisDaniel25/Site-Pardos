import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ISponsors } from 'src/app/interfaces/sponsors/sponsors';
import { SponsorsService } from 'src/app/services/sponsors/sponsors.service';
import { environment } from 'src/environments/environment';
import { Guid } from '../../helpers/Guid';
import Swal from 'sweetalert2';
declare var $ : any;

@Component({
  selector: 'app-sponsors-management',
  templateUrl: './sponsors-management.component.html',
  styleUrls: ['./sponsors-management.component.css']
})
export class SponsorsManagementComponent implements OnInit {

  SponsorForm: FormGroup;
  SponsorList: ISponsors[];

  @ViewChild('fileInput1',{static: false}) fileInput1: ElementRef
  @ViewChild('fileInput2',{static: false}) fileInput2: ElementRef

  fileName = "";
  image_path = "";

  logoName = "";
  logo_path = "";

  constructor(private route: Router, private service: SponsorsService) { }

  ngOnInit(): void {
    this.InitForm();
    this.onGetSponsor();
  }

  ShowContentExample(Id) {
    $("#SponsorDetail"+Id).modal('show');
  }

  InitForm() {
    this.SponsorForm = new FormGroup({
      sponsorId: new FormControl(0),
      company: new FormControl(null),
      advertising_image_path: new FormControl(null),
      info: new FormControl(null),
      logo_path: new FormControl(null)
    });
  }

  onGetSponsor() {
    this.service.GetSponsor()
    .subscribe(response => {
      this.SponsorList = response;
    });
  }

  onClearForm() {
    this.SponsorForm.reset();
    this.SponsorForm.get('sponsorId').setValue(0);
  }

  onDeleteSponsor(sponsorId: number, sponsor) {
    Swal.fire({
      title: '¿Esta seguro de eliminar el articulo de ' + sponsor.company + ' ?',
      text: "No sera permitido revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!',
      cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.DeleteSponsor(sponsorId)
          .subscribe(res => {
            Swal.fire(
              'Eliminado!',
              'Ha eliminado exitosamente el articulo deseado.',
              'success'
            )
            this.onGetSponsor();
          });
      }
    });
  }

  onSelectFile1(event: any) {
    const file = <File>event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event)=> {
        this.fileName = Guid.newGuid() + "-" + file.name.toString().trim().replace(' ','');
        this.image_path = environment.URL_PATH_SPONSORS_IMAGE + "/" + this.fileName;
        this.SponsorForm.get('advertising_image_path').setValue(this.image_path);
      }
    }
  }

  onSelectFile2(event: any) {
    const file = <File>event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event)=> {
        this.logoName = Guid.newGuid() + "-" + file.name.toString().trim().replace(' ','');
        this.logo_path = environment.URL_PATH_SPONSORS_IMAGE + "/" + this.logoName;
        this.SponsorForm.get('logo_path').setValue(this.logo_path);
      }
    }
  }

  onCreateSponsor() {
    const media_cover = this.fileInput1.nativeElement.files[0];
    const media_logo = this.fileInput2.nativeElement.files[0];
    if (media_cover && media_logo) {
      const file1 = new FormData();
      const file2 = new FormData();
      file1.append('file', media_cover, this.fileName);
      file2.append('file', media_logo, this.logoName);
      this.service.UploadMultimediaFile(file1)
      .subscribe(response => {
        this.service.UploadMultimediaFile(file2)
        .subscribe(response => {
          const Bloc = this.SponsorForm.value;
          this.service.CreateSponsor(Bloc)
          .subscribe(response => {
            this.message('success', "Se ha creado un nuevo articulo exitosamente...");
            this.onGetSponsor();
            this.onClearForm();
          }, error => {
            this.message('warning', "Error al agregar nuevo articulo...");
            this.onClearForm();
          });
        });
      }); 
    }
    else {
      this.message('warning', 'Para crear un nuevo artículo es necesario tener una foto de portada.');
    }
  }

  BacktoMenu() {
    this.route.navigate(['menu/administration']);
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
