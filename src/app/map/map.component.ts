import {Component, OnInit, Input, Output, EventEmitter, SimpleChange, SimpleChanges} from '@angular/core';
import * as L from 'leaflet'
import {
  Map,
  ZoomAnimEvent,
  MapOptions,
  tileLayer,
  latLng,
  LatLng,
} from 'leaflet';

import {polyline_} from "@mapbox/polyline"
import {DataService} from "../services/data.service";
import {Coordinates, Routes} from "../types";
import {MapUtils} from "../utils/map.utils";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() routes:object[]
  @Output() map$: EventEmitter<Map> = new EventEmitter;
  @Output() zoom$: EventEmitter<number> = new EventEmitter;
  @Input() options: MapOptions= {
    layers:[tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      opacity: 0.7,
      maxZoom: 19,
      detectRetina: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })],
    zoom:6,
    center:latLng(41.886,11.613)
  };
  public map: Map;
  public zoom: number;

  routesPoints:Routes[]

  constructor(dataService: DataService) {
    dataService.routes$.subscribe(r => {
      this.routesPoints = r
      this.updateRoutePoints()
    })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.map.clearAllEventListeners();
    this.map.remove();
  };

  ngOnChanges(changes:SimpleChanges) {
    this.updateRoute(changes['routes'].currentValue)
  }

  plotRoutePolyline(routePolyline) {
    let polyline = MapUtils.createPolylineFromCoordinates(routePolyline, "red")
    polyline.addTo(this.map);
    this.map.fitBounds(polyline.getBounds())
  }
  updateRoute(routes:[][]) {
    console.log("Polyline:")
    console.log(routes)
    console.log(routes[0])
    routes.forEach(routePolyline => {
      this.plotRoutePolyline(routePolyline)
    })
  }

  clearMap() {
    // clear markers
    // clear polylines
  }

  onMapReady(map: Map) {
    this.map = map;
    this.map$.emit(map);
    this.zoom = map.getZoom();
    this.zoom$.emit(this.zoom);
  }

  onMapZoomEnd(e: ZoomAnimEvent) {
    this.zoom = e.target.getZoom();
    this.zoom$.emit(this.zoom);
  }

  getIcon(color:string) {

    return new L.Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  }
  updateRoutePoints(){

    let icon
    let iconRed = this.getIcon('red')
    let iconBlue = this.getIcon('blue')
    let iconGreen = this.getIcon('green')

    this.routesPoints.forEach( route => {
      route.coordinates.forEach( (point,i) => {
        if(i==0) icon = iconGreen
        else if (i==route.coordinates.length-1) icon = iconRed
        else icon = iconBlue
        L.marker([point.lat, point.lon], {icon:icon}).addTo(this.map)
      })
    })
  }

  protected readonly event = event;
}
