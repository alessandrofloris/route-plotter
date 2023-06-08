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

  onFileSelected(event : any) {
    const file: File = event.target.files[0];
    this.fileName = file.name;
    this.readFile(file)
  }

  readFile(file: File) {
    const reader: FileReader = new FileReader();

    reader.onload = () => {
      const fileContents: string | ArrayBuffer | null = reader.result;

      let routes = InputUtils.processInput(fileContents)
      this.dataService.updateRoutes(routes)
    };

    reader.readAsText(file);
  }

}
