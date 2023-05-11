import { Injectable } from '@angular/core';
import {Coordinates} from "../types";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  route = new Subject<Coordinates[]>()
  route$ = this.route.asObservable()

  constructor() {
    this.route.next([])
  }

  updateRoute(route:Coordinates[]) {
    this.route.next(route)
  }


}
