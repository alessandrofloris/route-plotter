import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../services/data.service";
import {Coordinates} from "../types";
import {ApiService} from "../services/api.service";
import * as Leaflet from "leaflet"

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.scss']
})
export class PlotComponent implements OnInit {

  route:Coordinates[]
  routeToDraw:object
  messaggio:string
  constructor(private dataService:DataService,
              private api:ApiService) {
    dataService.route$.subscribe(r => {
      this.route = r
      this.updateView()
    })
  }

  ngOnInit(): void {}

  extractData(data:any) {
    this.routeToDraw = data.routes[0].geometry.coordinates
  }
  updateView() {
    if(this.route.length > 0) {
      this.messaggio = "Hai una rotta!"
      this.api.getRouteData(this.route).subscribe(data => {
        console.log(data)
        this.extractData(data)
      })
    }
  }

}
