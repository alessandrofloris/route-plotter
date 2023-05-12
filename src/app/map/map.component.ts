import {Component, OnInit, Input, Output, EventEmitter, SimpleChange, SimpleChanges} from '@angular/core';
import * as L from 'leaflet'
import {
  Map,
  LeafletEvent,
  Control,
  DomUtil,
  ZoomAnimEvent,
  Layer,
  MapOptions,
  tileLayer,
  latLng,
  Polyline,
  LatLng,
  Marker
} from 'leaflet';

import {polyline_} from "@mapbox/polyline"
import {DataService} from "../services/data.service";
import {Coordinates} from "../types";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() route:object
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

  routePoints:Coordinates[]

  constructor(dataService: DataService) {
    dataService.route$.subscribe(r => {
      this.routePoints = r
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
    this.updateRoute(changes['route'].currentValue)
  }

  updateRoute(route:[]) {
    console.log(route)
    let pointList:LatLng[] = []
    route.forEach( c => {
      let lon = c[0]
      let lat = c[1]
      let point = new LatLng(lat, lon)
      pointList.push(point)
    })
    let firstpolyline = new L.Polyline(pointList, {
      color: 'red',
      weight: 5,
      opacity: 0.5,
      smoothFactor: 1
    });
    firstpolyline.addTo(this.map);
    this.map.fitBounds(firstpolyline.getBounds())
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

    this.routePoints.forEach( (point,i) => {
      if(i==0) icon = iconGreen
      else if (i==this.routePoints.length-1) icon = iconRed
      else icon = iconBlue
      L.marker([point.lat, point.lon], {icon:icon}).addTo(this.map)
    })
  }

  protected readonly event = event;
}
