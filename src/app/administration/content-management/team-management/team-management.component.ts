import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IPlayers } from 'src/app/interfaces/players/players';
import { IPositions } from 'src/app/interfaces/positions/positions';
import { PlayersService } from 'src/app/services/players/players.service';
import { PositionsService } from 'src/app/services/positions/positions.service';
import { environment } from 'src/environments/environment';
import { Guid } from '../../helpers/Guid';
import Swal from 'sweetalert2';
declare var $ : any;

@Component({
  selector: 'app-team-management',
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.css']
})
export class TeamManagementComponent implements OnInit {

  TeamForm: FormGroup;
  TeamList: IPlayers[]
  PositionList: IPositions[];

  @ViewChild('fileInput',{static: false}) fileInput: ElementRef

  url = "";
  fileName = "";
  image_path = "";

  constructor(private route: Router, private service: PlayersService, private Positionservice: PositionsService) { }

  ngOnInit(): void {
    this.InitForm();
    this.onGetTeam();
    this.GetPositions();
  }

  ShowContentExample(Id) {
    $("#PlayerPhoto"+Id).modal('show');
  }

  InitForm() {
    this.TeamForm = new FormGroup({
      playerId: new FormControl(0),
      name: new FormControl(null),
      lastname: new FormControl(null),
      weight: new FormControl(null),
      number: new FormControl(null),
      height: new FormControl(null),
      active: new FormControl(null),
      captain: new FormControl(null),
      positionId: new FormControl(0),
      profile_picture_path: new FormControl(null),
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
    this.TeamForm.get('playerId').setValue(0);
  }

  onDeleteTeam(playerId: number, player) {
    Swal.fire({
      title: '¿Esta seguro de eliminar a ' + player.name + ' ' + player.lastname + ' ?',
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

  onSelectFile(event: any) {
    const file = <File>event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event)=> {
        this.url =  (<FileReader>event.target).result.toString();
        this.fileName = Guid.newGuid() + "-" + file.name.toString().trim().replace(' ','');
        this.image_path = environment.URL_PATH_PLAYER_IMAGE + "/" + this.fileName;
        this.TeamForm.get('profile_picture_path').setValue(this.image_path);
      }
    }
  }

  onCreateTeam() {
    const media = this.fileInput.nativeElement.files[0];
    if (media) {
      const file = new FormData();
      file.append('file', media, this.fileName);
      console.log(file.get('file'));
      this.service.UploadMultimediaFile(file)
      .subscribe(response => {
        const Player = this.TeamForm.value;
        this.service.CreatePlayers(Player)
        .subscribe(response => {
          this.message('success', "Se ha creado un nuevo jugador exitosamente...");
          this.onGetTeam();
          this.onClearForm();
        }, error => {
          this.message('warning', "Error al agregar nuevo jugador...");
          this.onClearForm();
        });
      });
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
