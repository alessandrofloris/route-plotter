import { Component, OnInit } from '@angular/core';
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

  // map:any
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

  // ngAfterViewInit(): void {
  //   this.initMap();
  // }

  // private initMap(): void {
  //   this.map = Leaflet.map('map', {
  //     center: [ 39.8282, -98.5795 ],
  //     zoom: 3
  //   });
  // }

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
