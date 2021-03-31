import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IPlayers } from 'src/app/interfaces/players/players';
import { IPositions } from 'src/app/interfaces/positions/positions';
import { PlayersService } from 'src/app/services/players/players.service';
import { PositionsService } from 'src/app/services/positions/positions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-team-management',
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.css']
})
export class TeamManagementComponent implements OnInit {

  TeamForm: FormGroup;
  TeamList: IPlayers[]
  PositionList: IPositions[];

  constructor(private route: Router, private service: PlayersService, private Positionservice: PositionsService) { }

  ngOnInit(): void {
    this.InitForm();
    this.onGetTeam();
    this.GetPositions();
  }

  InitForm() {
    this.TeamForm = new FormGroup({
      playerId: new FormControl(0),
      name: new FormControl(null),
      lastname: new FormControl(null),
      weight: new FormControl(null),
      height: new FormControl(null),
      positionId: new FormControl(0),
      profile_picture: new FormControl("s"),
      description: new FormControl(null),
    });
  }

  onGetTeam() {
    this.service.GetPlayers()
    .subscribe(response => {
      this.TeamList = response;
    });
  }

  GetPositions() {
    this.Positionservice.GetPositions()
    .subscribe(response => {
      this.PositionList = response;
    });
  }

  onClearForm() {
    this.TeamForm.reset();
  }

  onDeleteTeam(playerId: number) {
    Swal.fire({
      title: '¿Esta seguro de eliminar el jugador del código ' + playerId + ' ?',
      text: "No sera permitido revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!',
      cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.DeletePlayers(playerId)
          .subscribe(res => {
            Swal.fire(
              'Eliminado!',
              'Ha eliminado exitosamente el jugador deseado.',
              'success'
            )
            this.onGetTeam();
          });
      }
    });
  }

  onCreateTeam() {
    const Player = JSON.stringify(this.TeamForm.value);
    this.service.CreatePlayers(Player)
    .subscribe(response => {
      this.message('success', "Se ha creado un nuevo articulo exitosamente...");
      this.onGetTeam();
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
