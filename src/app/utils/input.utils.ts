import {Coordinates, Routes} from "../types";

export class InputUtils {

  /*
  * Prende in input un file che contiene la soluzione
  * di un VRP e restituisce un array i cui elementi
  * sono le diverse rotte che compongono la
  * soluzione al problema
  * */
  static processInput(inputData) {

    if(!inputData) {
      // error
    }

    if(typeof inputData !== "string") {
      // error
    }

    let lines:string[] = inputData.split("\n").filter(s => s)

    if(lines.length === 0) {
      // error
    }

    let coordinates:Coordinates[] = []
    let routes:Routes[] = []

    lines.forEach( lineRaw => {
      if(lineRaw === "*") {
        // new route
        routes.push({coordinates})
        coordinates = []
      } else {
        let line:string[] = lineRaw.split(",")
        let lat:number = Number(line[0])
        let lon:number = Number(line[1])
        coordinates.push({lat,lon})
      }
    })
    routes.push({coordinates})

    return routes
  }

}
