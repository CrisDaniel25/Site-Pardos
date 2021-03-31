import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IRol } from 'src/app/interfaces/rol/rol';
import { IUsers } from 'src/app/interfaces/users/users';
import { UsersService } from '../../services/users/users.service';
import { RolService } from 'src/app/services/rol/rol.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  UserForm: FormGroup;
  UserList: IUsers[];
  RolList: IRol[];

  constructor(private route: Router, private service: UsersService, private Rolservice: RolService) { }

  ngOnInit(): void {
    this.InitForm();
    this.onGetUsers();
    this.GetRol();
  }

  InitForm() {
    this.UserForm = new FormGroup({
      userId: new FormControl(0),
      name: new FormControl(null),
      lastname: new FormControl(null),
      username: new FormControl(null),
      passcode: new FormControl(null),
      rolId: new FormControl(1)
    });
  }

  onGetUsers() {
    this.service.GetUsers()
    .subscribe(response => {
      this.UserList = response
    });
  }

  GetRol() {
    this.Rolservice.GetRol()
    .subscribe(response => {
      this.RolList = response;
    });
  }

  onClearForm() {
    this.UserForm.reset();
  }

  onDeleteUser(userId: number) {
    Swal.fire({
      title: '¿Esta seguro de eliminar el usuario del código ' + userId + ' ?',
      text: "No sera permitido revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!',
      cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.DeleteUser(userId)
          .subscribe(res => {
            Swal.fire(
              'Eliminado!',
              'Ha eliminado exitosamente el usuario deseado.',
              'success'
            )
            this.onGetUsers();
          });
      }
    });
  }

  onCreateUser() {
    const User = JSON.stringify(this.UserForm.value);
    this.service.CreateNewUser(User)
    .subscribe(response => {
      this.message('success', "Se ha creado un nuevo usuario exitosamente...");
      this.onGetUsers();
      this.UserForm.reset();
    }, error => {
      this.message('warning', "Error al crear el nuevo usuario...");
      this.UserForm.reset();
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
