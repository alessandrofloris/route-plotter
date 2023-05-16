# Route Plotter

Route Plotter permette di visualizzare un plot delle soluzioni dei problemi di VRP.

## Input
Route Plotter prende in input un file che contiene le rotte da visualizzare.
Il file è codificato in questo modo:  
`lat1,lon1`  
`lat2,lon2`  
`ecc`  
`*`  
`lat2,lon2`  
`lat2, lon2`  
`ecc`

Dove il carattere `*` serve come separatore tra rotte differenti.

## Cose da fare
- Implementare gestione degli errori durante il processing del file in input

## Bug
- Quando carico delle nuove rotte non vengono eliminate qulle precedenti dalla mappa

## Nuovi feature da implementare
- Visualizzare multiple rotte
- Quando ci sono multiple rotte eseguire lo zoom in modo che si vedano tutte le rotte
- Visualizzare direzione della rotta da seguire
  - Un idea sarebbe quella di usare degli indici nei marker
    dei punti che fanno parte della rotta: D -> 1 -> 2 -> ...
- Modificare la visualizzazione

## Cose utili
- Per implementare la visualizzazione della direzione di una rotta: 
  - https://stackoverflow.com/questions/53307322/leaflet-polyline-arrows
  - https://gis.stackexchange.com/questions/337476/rendering-arrow-paths-in-leaflet
- Per implementare il geocoding dei punti:
  - https://wiki.openstreetmap.org/wiki/Nominatim
  - https://stackoverflow.com/questions/51702406/leaflet-translate-coordinates-into-street-addresses
- UI interessanti:
  - https://dribbble.com/shots/18860633-Cargo-web-app-concept
  - https://dribbble.com/shots/18506655-Optimizing-public-emergency-transport-Map-tablet-view
  - https://dribbble.com/shots/14304320-Shipping-Service
