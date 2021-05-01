import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IBloc } from 'src/app/interfaces/bloc/bloc';
import { BlocService } from 'src/app/services/bloc/bloc.service';
import { environment } from 'src/environments/environment';
import { Guid } from 'src/app/administration/helpers/Guid';
import Swal from 'sweetalert2';
declare var $ : any;

@Component({
  selector: 'app-bloc-management',
  templateUrl: './bloc-management.component.html',
  styleUrls: ['./bloc-management.component.css']
})
export class BlocManagementComponent implements OnInit {

  BlocForm: FormGroup;
  BlocList: IBloc[];

  @ViewChild('fileInput',{static: false}) fileInput: ElementRef

  url = "";
  fileName = "";
  image_path = "";

  constructor(private route: Router, private service: BlocService) { }

  ngOnInit(): void {
    this.InitForm();
    this.onGetBloc();
  }

  ShowContentExample(Id) {
    $("#BlocDetails"+Id).modal('show');
  }

  InitForm() {
    this.BlocForm = new FormGroup({
      blocId: new FormControl(0),
      tittle: new FormControl(null),
      cover_image_path: new FormControl(null),
      content: new FormControl(null)
    });
  }

  onGetBloc() {
    this.service.GetBloc()
    .subscribe(response => {
      this.BlocList = response;
    });
  }

  onClearForm() {
    this.BlocForm.reset();
    this.BlocForm.get('blocId').setValue(0);
  }

  onDeleteBloc(blocId: number, bloc) {
    Swal.fire({
      title: '¿Esta seguro de eliminar el articulo de ' + bloc.tittle + ' ?',
      text: "No sera permitido revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!',
      cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.DeleteBloc(blocId)
          .subscribe(res => {
            Swal.fire(
              'Eliminado!',
              'Ha eliminado exitosamente el articulo deseado.',
              'success'
            )
            this.onGetBloc();
          });
      }
    });
  }

  onSelectFile(event: any) {
    const file = <File>event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event)=> {
        this.url =  (<FileReader>event.target).result.toString();
        this.fileName = Guid.newGuid() + "-" + file.name.toString().trim().replace(' ','');
        this.image_path = environment.URL_PATH_BLOC_IMAGE + "/" + this.fileName;
        this.BlocForm.get('cover_image_path').setValue(this.image_path);
      }
    }
  }

  onCreateBloc() {
    const media = this.fileInput.nativeElement.files[0];
    if (media) {
      const file = new FormData();
      file.append('file', media, this.fileName);
      console.log(file.get('file'));
      this.service.UploadMultimediaFile(file)
      .subscribe(response => {
        const Bloc = this.BlocForm.value;
        this.service.CreateBloc(Bloc)
        .subscribe(response => {
          this.message('success', "Se ha creado un nuevo articulo exitosamente...");
          this.onGetBloc();
          this.onClearForm();
        }, error => {
          this.message('warning', "Error al agregar nuevo articulo...");
          this.onClearForm();
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
