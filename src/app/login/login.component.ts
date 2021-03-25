import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '../services/users/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm: FormGroup;

  constructor(private service: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      username: new FormControl(null),
      passcode: new FormControl(null)
    });
  }

  login() {
    try {
      if (this.LoginForm.get("username").value != null && this.LoginForm.get("passcode").value != null) {

        const credentials = JSON.stringify(this.LoginForm.value);

        this.service.Verify(credentials)
          .subscribe(response => {
            const token = (<any>response).token;
            localStorage.setItem("jwt", token);
            this.message('success', "Usuario verificado correctamente");
            this.router.navigate(["administration"]);           
          }, err => {
              this.message('warning', "Usuario ingresado no esta autorizado");
              this.LoginForm.reset();
          });
      }
      else if (this.LoginForm.get("username").value == null && this.LoginForm.get("passcode").value != null) {
        this.message('warning', "Por favor llenar la casilla de usuario");
        this.LoginForm.reset();
      }
      else if (this.LoginForm.get("username").value != null && this.LoginForm.get("passcode").value == null) {
        this.message('warning', "Por favor llenar la casilla de contraseña");
        this.LoginForm.reset();
      }
      else { this.message('warning', "LLenar por favor el formulario para poder loguearse"); }
    }
    catch (error) { this.message('warning', "Usuario ingresado no esta autorizado"); }
  }
  
  message(icon, tittle) {
    Swal.fire({
      position: 'center',
      icon: icon,
      title: tittle,
      showConfirmButton: false,
      timer: 3500
    });
  }

}
