import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Guid } from '../../helpers/Guid';

@Component({
  selector: 'app-info-management',
  templateUrl: './info-management.component.html',
  styleUrls: ['./info-management.component.css']
})
export class InfoManagementComponent implements OnInit {

  InfoForm: FormGroup;

  @ViewChild('fileInput',{static: false}) fileInput: ElementRef

  fileName = "";
  image_path = "";

  constructor(private route: Router) { }

  ngOnInit(): void {
    this.InitForm();
  }

  InitForm() {
    this.InfoForm = new FormGroup({
      infoId: new FormControl(),
      photo_url: new FormControl(),
      image_position: new FormControl(),
    });
  }

  onSelectFile(event: any) {
    const file = <File>event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event)=> {
        this.fileName = Guid.newGuid() + "-" + file.name.toString().trim().replace(' ','');
        this.image_path = environment.URL_PATH_INFO_IMAGE + "/" + this.fileName;
        this.InfoForm.get('cover_image_path').setValue(this.image_path);
      }
    }
  }

  BacktoMenu() {
    this.route.navigate(['menu/administration']);
  }
  
}
