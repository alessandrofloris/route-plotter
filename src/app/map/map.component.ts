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
  LatLng
} from 'leaflet';

import {polyline_} from "@mapbox/polyline"

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
    zoom:1,
    center:latLng(0,0)
  };
  public map: Map;
  public zoom: number;

  constructor() {
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

  protected readonly event = event;
}
