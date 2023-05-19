import {Component, OnInit, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';
import * as L from 'leaflet'
import {
  Map,
  ZoomAnimEvent,
  MapOptions,
  tileLayer,
  latLng,
  FeatureGroup,
  LayerGroup, Marker, Polyline,
} from 'leaflet';

import {DataService} from "../services/data.service";
import {Routes} from "../types";
import {MapUtils} from "../utils/map.utils";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

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

  activePolylineGroup:FeatureGroup
  activeMarkerGroup:LayerGroup

  routesPolylinesData:object[]
  routesMarkersData:Routes[]

  constructor(dataService: DataService) {

    // dataService.routes$.subscribe(r => {
    //   this.routesMarkersData = r
    //   this.updateRoutePoints()
    // })
    //
    // dataService.routesToDraw$.subscribe(r => {
    //   this.routesPolylinesData = r
    //   this.updateRoutesPolyline()
    // })
    //
    // this.activePolylineGroup = L.featureGroup()
    // this.activeMarkerGroup = L.layerGroup()

  }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.map.clearAllEventListeners()
    this.map.off()
    // this.map.remove()
  }

  plotRoutePolyline(routePolylineData) {
    let polyline = MapUtils.createPolylineFromCoordinates(routePolylineData, "red")
    polyline.addTo(this.activePolylineGroup)
  }
  updateRoutesPolyline() {
    // this.clearPolylines()
    // this.routesPolylinesData.forEach(routePolylineData => {
    //   this.plotRoutePolyline(routePolylineData)
    // })
    //
    // console.log("Anche qui??'")
    // this.activePolylineGroup.addTo(this.map)
    // this.map.fitBounds(this.activePolylineGroup.getBounds())
  }

  clearMarkers() {
    console.log("marker")
    console.log(this.activeMarkerGroup)
    this.activeMarkerGroup.clearLayers()
  }

  clearPolylines() {
    this.activePolylineGroup.clearLayers()
  }

  onMapReady(map: Map) {
    this.map = map
    this.map$.emit(map)
    this.zoom = map.getZoom()
    this.zoom$.emit(this.zoom)
  }

  onMapZoomEnd(e: ZoomAnimEvent) {
    this.zoom = e.target.getZoom()
    this.zoom$.emit(this.zoom)
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
    // this.clearMarkers()
    // let icon
    // let iconRed = this.getIcon('red')
    // let iconBlue = this.getIcon('blue')
    // let iconGreen = this.getIcon('green')
    //
    // this.routesMarkersData.forEach( route => {
    //   route.coordinates.forEach( (point,i) => {
    //     if(i==0) icon = iconGreen
    //     else if (i==route.coordinates.length-1) icon = iconRed
    //     else icon = iconBlue
    //     let marker = L.marker([point.lat, point.lon], {icon:icon}).bindTooltip(`<b>${i}</>`)
    //     marker.addTo(this.activeMarkerGroup)
    //
    //   })
    // })
    // console.log("QUI?")
    // this.activeMarkerGroup.addTo(this.map)
  }

  // protected readonly event = event;
}
