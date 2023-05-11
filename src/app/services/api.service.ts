import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  routeServiceUrl:string = "https://router.project-osrm.org/route/v1/driving/9.102343,39.236751;9.115390,39.229225?overview=full"
  constructor(private http: HttpClient) { }

  getRouteData() {
    return this.http.get(this.routeServiceUrl)
  }
}
