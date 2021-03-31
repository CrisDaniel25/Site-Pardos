import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IBloc } from 'src/app/interfaces/bloc/bloc';
import { BlocService } from 'src/app/services/bloc/bloc.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bloc-management',
  templateUrl: './bloc-management.component.html',
  styleUrls: ['./bloc-management.component.css']
})
export class BlocManagementComponent implements OnInit {

  BlocForm: FormGroup;
  BlocList: IBloc[];

  constructor(private route: Router, private service: BlocService) { }

  ngOnInit(): void {
    this.InitForm();
    this.onGetBloc();
  }

  InitForm() {
    this.BlocForm = new FormGroup({
      blocId: new FormControl(0),
      tittle: new FormControl(null),
      cover_image: new FormControl("AVC"),
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
  }

  onDeleteBloc(blocId: number) {
    Swal.fire({
      title: '¿Esta seguro de eliminar el articulo del código ' + blocId + ' ?',
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

  onCreateBloc() {
    const Bloc = JSON.stringify(this.BlocForm.value);
    this.service.CreateBloc(Bloc)
    .subscribe(response => {
      this.message('success', "Se ha creado un nuevo articulo exitosamente...");
      this.onGetBloc();
      this.onClearForm();
    }, error => {
      this.message('warning', "Error al agregar nuevo articulo...");
      this.onClearForm();
    });
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
