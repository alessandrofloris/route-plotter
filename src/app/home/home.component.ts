/**
 * In questo componente viene effettuato l'uoload
 * di una soluzione a un problema VRP.
 *
 * Viene letto un file contenente N rotte, e queste
 * N rotte vengono salvate usando il DataService.
 *
 * */
import { Component, OnInit } from '@angular/core';
import {Coordinates} from "../types";
import { MatIconModule } from '@angular/material/icon';
import {DataService} from "../services/data.service";
import {InputUtils} from "../utils/input.utils";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  fileName:string
  constructor(private dataService:DataService) {
  }

  ngOnInit(): void {
  }

}
