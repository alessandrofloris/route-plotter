import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../services/data.service";
import {Coordinates, Routes} from "../types";
import {ApiService} from "../services/api.service";
import * as Leaflet from "leaflet"

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.scss']
})
export class PlotComponent implements OnInit {

  routes:Routes[]
  routesToDraw:object[]
  messaggio:string
  constructor(private dataService:DataService,
              private api:ApiService) {
    this.routesToDraw = []
    dataService.routes$.subscribe(r => {
      this.routes = r
      this.updateView()
    })
  }

  ngOnInit(): void {}

  extractData(data:any) {
    console.log("Next()")
    this.routesToDraw.push(data.routes[0].geometry.coordinates)
    this.routesToDraw = [...this.routesToDraw]
  }
  updateView() {
    if(this.routes.length > 0) {
      this.messaggio = "Hai delle rotte da visualizzare!"
      this.routes.forEach( route => {
        this.api.getRouteData(route.coordinates).subscribe(data => {
          this.extractData(data)
        })
      })
    }
  }

}
