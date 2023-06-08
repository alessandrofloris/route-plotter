import { Injectable } from '@angular/core';
import {Coordinates, Routes} from "../types";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  routes = new Subject<Routes[]>()
  routes$ = this.routes.asObservable()

  constructor() {
  }

  updateRoutes(routes:Routes[]) {
    this.routes.next(routes)
  }

}
