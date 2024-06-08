# Modellek
## USER
	Uid //felhasználó azon.
	Név
	Title? // opcionális kiegésítő név
	Image? // porfilkép elérése
	Email? // publikus email
	Tel? // publikus tel
	Link[] // publikus linkek sora
	Location // helyzet (Lat/Lng)
	Recommendations[] // ajánlások/pajtások
 	Buziness[] // feltöltött buzinesek
	Sale[] // feltöltött cserebere hirdetések
## BUZINESS
	Title // ez alapján lehet megtalálni
	Description
	Author
	Images[]
	Recommendations[]
 ## SALE
	Title // ez alapján lehet megtalálni
	Category // tárgyat keresek/kínálok, lakást, munkát
	Images[]
	Description
	Author
	Created At
	Recommendations[]
## DOCS
	Title
	Category // string
	Author
	Created At
	Body // egy html?/markdown szerkezetű string ami a cikk maga
	References // linkek
	Recommendations[]
## _RECOMMENDATION // külön recommendationok buzinessre/salere/userre
	Recommend // ajánlott record id
	Author
	Created At

# Firebase Adatok

## Realtime Database
	users/{uid}/name
	users/{uid}/settings/
	comments/{id}

## Storage



# API végpontok

## USER
	POST /
	PATCH /
	DELETE /
	GET /id
	POST /id/recommend
## BUZINESS
	POST /
	PATCH /id
	DELETE /id
	GET /
	GET /id
	POST /id/recommend
## SALE
	POST /
	PATCH /id
	DELETE /id
	GET /
	GET /id
	POST /id/recommend
## DOCS
	POST /
	PATCH /id
	DELETE /id
	GET /
	GET /id
	POST /id/recommend
	
