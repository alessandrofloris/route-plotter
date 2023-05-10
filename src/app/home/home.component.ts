import { Component, OnInit } from '@angular/core';
import {Coordinates} from "../types";
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  coordinates:Coordinates[]
  fileName:string
  constructor() {
    this.coordinates = []
  }

  ngOnInit(): void {
  }

  processInput(data:any) {

    if(typeof data === "string") {
      let lines:string[] = data.split("\n")

      lines.forEach( line_raw => {
        let line:string[] = line_raw.split(",")
        let lat:number = Number(line[0])
        let lon:number = Number(line[1])
        this.coordinates.push({lat,lon})
      })

    } else {
      console.log("[Error] Formato del file non corretto")
    }

  }

  readFile(file: File) {
    const reader: FileReader = new FileReader();

    reader.onload = () => {
      const fileContents: string | ArrayBuffer | null = reader.result;

      console.log(fileContents);

      this.processInput(fileContents)
    };

    reader.readAsText(file);
  }

  onFileSelected(event : any) {
    const file: File = event.target.files[0];

    this.fileName = file.name;

    this.readFile(file)
  }

}
