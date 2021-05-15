import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../services/players/players.service';
import { IPlayers } from '../interfaces/players/players';
declare var $ : any;

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css']
})
export class TeamPageComponent implements OnInit {

  List: IPlayers[];

  constructor(private service: PlayersService) { }

  ngOnInit(): void {
    this.onGetPlayers();
  }

  ShowContentExample(Id) {
    $("#PlayerPhoto"+Id).modal('show');
  }

  onGetPlayers() {
    this.service.GetPlayers()
    .subscribe(response => {
      this.List = response;
    });
  }

  GetSeason(date) {
    var entry_date = new Date(date);
    var today = new Date();
    var displayed_date = today.getFullYear() - entry_date.getFullYear();

    if (displayed_date == 0) {
      return 'Rookie'
    }

    return displayed_date + ' temporada';
  }

  GetHeight(height) {
    var number_height = height / 30.48;
    var displayed_height =  number_height.toFixed(1).replace('.','’');
    return displayed_height;
  }

  shiftLeft() {
    $('#carouselDescription').carousel('next');
    const boxes = document.querySelectorAll(".box");
    const tmpNode = boxes[0];
    boxes[0].className = "box move-out-from-left";

    setTimeout(function() {
        if (boxes.length > 5) {
            tmpNode.classList.add("box--hide");
            boxes[5].className = "box move-to-position5-from-left";
        }
        boxes[1].className = "box move-to-position1-from-left";
        boxes[2].className = "box move-to-position2-from-left";
        boxes[3].className = "box move-to-position3-from-left";
        boxes[4].className = "box move-to-position4-from-left";
        boxes[0].remove();

        document.querySelector(".cards__container").appendChild(tmpNode);

    }, 500);
  }

  shiftRight() {
    $('#carouselDescription').carousel('prev');
    const boxes = document.querySelectorAll(".box");
    boxes[4].className = "box move-out-from-right";
    setTimeout(function() {
        const noOfCards = boxes.length;
        if (noOfCards > 4) {
            boxes[4].className = "box box--hide";
        }

        const tmpNode = boxes[noOfCards - 1];
        tmpNode.classList.remove("box--hide");
        boxes[noOfCards - 1].remove();
        let parentObj = document.querySelector(".cards__container");
        parentObj.insertBefore(tmpNode, parentObj.firstChild);
        tmpNode.className = "box move-to-position1-from-right";
        boxes[0].className = "box move-to-position2-from-right";
        boxes[1].className = "box move-to-position3-from-right";
        boxes[2].className = "box move-to-position4-from-right";
        boxes[3].className = "box move-to-position5-from-right";
    }, 500);
  }
}

