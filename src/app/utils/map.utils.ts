import {LatLng} from "leaflet";
import * as L from "leaflet";

export class MapUtils {

  static createPolylineFromCoordinates(coordinates, color:string) {
    let pointList:LatLng[] = []
    coordinates.forEach( c => {
      let lon = c[0]
      let lat = c[1]
      let point = new LatLng(lat, lon)
      pointList.push(point)
    })
    return new L.Polyline(pointList, {
      color: color,
      weight: 5,
      opacity: 0.5,
      smoothFactor: 1
    });
  }
}
