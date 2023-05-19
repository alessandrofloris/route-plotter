import { Injectable } from '@angular/core';
import {Routes} from "../types";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  routes = new Subject<Routes[]>()
  routes$ = this.routes.asObservable()

  routesToDraw = new Subject<object[]>()
  routesToDraw$ = this.routesToDraw.asObservable()

  constructor() {
  }

  updateRoutesToDraw(routesToDraw:object[]) {
    this.routesToDraw.next(routesToDraw)
  }


  updateRoutes(routes:Routes[]) {
    this.routes.next(routes)
  }

}
