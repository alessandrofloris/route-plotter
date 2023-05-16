import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Coordinates} from "../types";
import {point} from "leaflet";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  routeString:string
  routeServiceUrl:string = "https://router.project-osrm.org/route/v1/driving/9.102343,39.236751;9.115390,39.229225?overview=full&geometries=geojson"
  routeServiceUrlPrefix:string = "https://router.project-osrm.org/route/v1/driving/"
  routeServiceUrlSuffix:string = "?overview=full&geometries=geojson"
  constructor(private http: HttpClient) {
    this.routeString = ""
  }

  private createRouteString(route) {
    this.routeString = ""
    route.forEach( r => {
      let lat = String(r.lat)
      let lon = String(r.lon)
      let pointString = lon + "," + lat + ";"
      this.routeString = this.routeString + pointString
    })
    this.routeString = this.routeString.slice(0,this.routeString.length-1)
  }
  getRouteData(route:Coordinates[]) {
    this.createRouteString(route)
    let url = this.routeServiceUrlPrefix + this.routeString + this.routeServiceUrlSuffix
    return this.http.get(url)
  }
}
