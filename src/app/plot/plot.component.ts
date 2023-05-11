import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {Coordinates} from "../types";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.scss']
})
export class PlotComponent implements OnInit {

  route:Coordinates[]
  polyline:string
  messaggio:string
  constructor(private dataService:DataService,
              private api:ApiService) {
    dataService.route$.subscribe(r => {
      this.route = r
      this.updateView()
    })
  }

  ngOnInit(): void {}

  drawMap() {

  }
  extractData(data:any) {
    this.polyline = data.routes[0].geometry
    this.drawMap()
  }
  updateView() {
    if(this.route.length > 0) {
      this.messaggio = "Hai una rotta!"
      this.api.getRouteData().subscribe(data => {
        this.extractData(data)
      })
    }
  }

}
