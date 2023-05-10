1. Prendere in input i punti che compongono la rotta
	Verrà passato al programma un file di testo strutturato in questo modo:
	lat1,lon1
	lat2,lon2
	...
	Ogni riga descrive la posizione di un punto facente parte della rotta.
	I punti sono specificati in ordine di percorrenza.
2. Creare con i punti in input una stringa da passare all'api di OSRM
	lon1,lat1;lon2,lat2,...
3. Eseguire una chiamata http al servizio "route" di OSRM
4. Estrarre dal file json risultante dalla chiamata il campo geometry
5. Usare leaflet per eseguire un plot della rotta
