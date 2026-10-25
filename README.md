# Mijn knuffelboerderij

Een Nederlandstalig browserspel met konijntjes, kippen, poesjes en varkens.
Selecteer dieren om ze te aaien, baby's te fokken of erop te rijden. Baby's
worden na één minuut volwassen. De boerderij bewaart zichzelf via localStorage.

## Starten

Geen installatie of externe pakketten nodig. Open `index.html` in een browser,
of start vanuit deze map een lokale server:

```sh
python3 -m http.server 8000
```

Beweeg met de pijltjestoetsen, WASD, de schermknoppen of door op het gras te klikken.
Twee volwassen dieren van dezelfde soort kunnen een baby krijgen; daarna rusten
de ouders 30 seconden. Er passen maximaal 40 dieren op de boerderij.

## Controle

```sh
node --check game.js
```

Controleer in de browser: selecteren, aaien, fokken, opgroeien, rijden en afstappen.
Ververs de pagina om te controleren dat je dieren bewaard zijn.

## Zo speel je

1. Kies een dier in het groene veld of klik op zijn naam onder het veld.
2. Typ een eigen naam en klik op **Naam bewaren**.
3. Kies bij **Tweede ouder** een volwassen dier van dezelfde soort.
4. Voor een paard: kies **Wit** of **Vos**, en vink eventueel **Bles**,
   **Gevlekt** of beide aan.
5. Klik op **Maak een baby**. Baby's groeien in één minuut op; ouders rusten
   na het fokken 30 seconden.

Bij **Mijn meisje** kies je de haarkleur en geen hoofddeksel, een cap of een
cowboyhoed. Die keuzes blijven bewaard, ook tijdens het rijden.

Aaien geeft één bandpunt. Bewegen terwijl je op het dier rijdt geeft 0,2 punt.
Iedere vijf punten stijgt de band een level, tot level 5: kennismaken,
vriendjes, goede vrienden, beste maatjes en onafscheidelijk.

Een nieuwe boerderij heeft twaalf dieren: twee per soort, inclusief paarden en koeien.
Bestaande opgeslagen boerderijen houden hun dieren en krijgen twee paarden
als die nog ontbreken. De dierenlijst blijft beschikbaar naast het veld.

## Rijden en aankleden

Kies een volwassen paard en klik op **Rijden**. Via **Waar gaan we rijden?**
wissel je tussen de boerderij, springbak, dressuurbak, het strand en het bos.
De boerderij blijft bereikbaar en je dieren blijven bewaard als je op pad gaat.

- Springbak: rijd vlak bij een balk en druk op spatie of **Spring!**.
  Een geslaagde sprong geeft twee bandpunten.
- Dressuur: volg A → K → E → H → C → M → B → F. Rijd dicht bij een letter
  om verder te gaan. Iedere gehaalde letter geeft twee bandpunten.
- Strand en bos: vrije buitenritten met golven, zonlicht, wiegende bomen,
  vogels en vlinders. Animaties respecteren de browserinstelling voor
  verminderde beweging.

Bij **Mijn meisje** kies je rijkleding of een spijkerbroek en kleuren voor
trui, rijbroek en laarzen. Een spijkerbroek heeft de vaste blauwe denimkleur.
Selecteer een paard om zijn dressuur-, spring- of westernzadel (of geen zadel),
zadelkleur en dekje te kiezen. Ieder paard bewaart zijn eigen uitrusting.

Het spel gebruikt gestileerde SVG-tekeningen, geen fotorealistische 3D-modellen.
`speel.html` bevat het hele spel in één bestand; na wijzigingen aan `index.html`
of `game.js` moet deze distributieversie opnieuw worden samengesteld door de
externe scriptverwijzing te vervangen door de inhoud van `game.js` in een script-tag.

Browsercontroles uitgevoerd: dieren selecteren, hernoemen, fokken, vachtkeuzes,
uiterlijk bewaren, bandlevels, rijden/afstappen, zadelkeuzes bewaren,
sprongen scoren, dressuurletters volgen en alle rijomgevingen laden.

## Zelf sprongen bouwen

Open **Springbak** en gebruik **Bouw je eigen parcours**. Selecteer een sprong
om twee balkkleuren, de staanderkleur, hoogte (twee, drie of vier balken), breedte
en positie te wijzigen. Voeg maximaal acht sprongen toe. Minstens één sprong
blijft staan. Het parcours wordt apart in localStorage bewaard en blijft bestaan
als je tussen rijplekken wisselt of de pagina ververst. De hoogte verandert de
getekende hindernis; de bediening voor springen blijft gelijk.

De spring- en dressuurbak hebben een witte omheining. De dressuurbak toont
A, K, E, H, C, M, B en F op duidelijk omlijnde letterbordjes.

Gecontroleerd in Chromium: wijzigingen in alle spronginstellingen, toevoegen en
verwijderen, herstel na verversen, sprongherkenning op de gewijzigde locatie,
dressuurletters, mobiel formaat en de bestaande fok- en rijacties.

## 3D-proefversie

De hoofdversie gebruikt nu een echte WebGL-scène met meegeleverde Three.js
0.160.1 (MIT; licentie in `vendor/THREE-LICENSE.txt`). Er zijn geen CDN-aanvragen
of installaties nodig om te spelen. Bij ontbrekende WebGL-ondersteuning blijft
de eenvoudige 2D-weergave beschikbaar, met een melding bij de camerabediening.

- Sleep met de muis of één vinger om rond te kijken; scroll om te zoomen.
- **Camera terugzetten** herstelt de beginhoek.
- Houd pijltjestoetsen of WASD ingedrukt om vanuit de kijkrichting te bewegen.
  De schermpijlen kunnen ook ingedrukt worden gehouden.
- De camera volgt je. Bos, strand, stad en park hebben geen oude veldgrens;
  de omgeving wordt tijdens het reizen aangevuld. Wisselen van rijplek brengt
  je naar het beginpunt van die plek.
- De ruiter zit met gebogen knieën op het paard. De zon staat hoog in de lucht.
- De stad bevat wandelende mensen, winkelgevels en een vrij toegankelijk park.
  De winkels zijn voorlopig decor met naambordjes; er is geen koopfunctie.
- De 3D-modellen zijn gestileerde, ronde figuren. Dit is een eerste speelbare
  3D-versie, geen fotorealistische simulatie.

Maak na bronwijzigingen de optionele enkelbestandsversie opnieuw met
`python3 build-standalone.py`. Start de lokale server zoals hierboven en voer
`node tests/browser.cjs` uit wanneer Playwright en Chromium beschikbaar zijn.
De test gebruikt software-WebGL en controleert camera-orbit en zoom, de zittende
ruiter, doorrijden met cameravolging, stad/park, fokken, zadels, dressuur,
sprongen, bewaren van voortgang en de mobiele pagina-indeling.

De 3D-paarden hebben nu gladde, doorlopende oppervlakken voor romp, hals en
hoofd, een subtiele vachtstructuur, kleinere ogen en gevormde hoeven.
De stad heeft ramen met kozijnen, kruisroeden, reflecties en vensterbanken
op alle gevels. Rond het aparte park staan ook huizen met ramen. De raamonderdelen
worden samen getekend met instancing om veel losse tekenaanroepen te voorkomen.

Het bos heeft één open plek bij het beginpunt, met een smal kronkelend pad en
veel dichte begroeiing eromheen. De bomen, struiken, varens en bloemen worden
in groepen getekend, zodat ook verder rijden mogelijk blijft. Er zijn geen
voorbijgangers in het bos. De 34 vlinders vliegen in 3D met bewegende vleugels.

De paarden hebben kortere oren, rondere ogen, een zichtbare bles op het eigen
hoofdoppervlak, duidelijkere manen en volle staarten vanaf de achterhand.
Elk been is één doorlopend gevormd oppervlak dat de hoef overlapt. Varkens hebben
oren, een snuit en krulstaart; katten hebben puntoren, snorharen en een staart;
konijnen hebben roze binnenoren en een staartje; kippen hebben kammen, vleugels,
een snavel en staartveren.

De stad bestaat nu uit betegelde pleinen met een fontein, bankjes en acht
winkelgevels per bouwblok. Rond de pleinen liggen straten met zebrapaden,
rijdende gewone auto's, taxi's en politieauto's. Trams rijden over de rails.
Het groene park is een aparte rijplek. Het verkeer is decoratief: er is nog
geen verkeersregel- of botsingssimulatie. Bij verminderde beweging staan de
voertuigen op hun routes stil.

## Een dier meenemen aan een touw

Op de boerderij staan nu ook twee koeien, Bella en Bontje, wanneer er voldoende
plek is binnen de limiet van 40 dieren. Bestaande dieren blijven bewaard.
Klik op een koe of ander dier en kies **Meenemen aan touw**. Je meisje staat
naast het dier; loop met de pijltjes en het dier volgt aan een zichtbaar touw.
Je kunt samen naar de stad, het park, het bos of een andere rijplek gaan.
Met **Touw loslaten** stopt het volgen en blijft het dier op die plek staan.
Je kunt één dier tegelijk meenemen. De actieve touwverbinding stopt als je de
pagina vernieuwt; de diergegevens en de laatst opgeslagen plek blijven bewaard.

`node tests/leading.cjs` controleert de koeien, meelopen door de stad,
het zichtbare touw en het loslaten zonder dat het dier verdwijnt.

## Stap, draf en galop

Stap eerst op een volwassen dier met **Rijden**. Kies daarna **Stap**, **Draf**
of **Galop**. Het dier beweegt vanzelf verder in zijn rijrichting. De pijltjes
of WASD bepalen een nieuwe richting vanuit de camera; alleen rondkijken met de
muis verandert de rijrichting niet. Elke gang heeft een eigen snelheid en
beenbeweging. **Halt**, afstappen, een andere rijplek kiezen of het tabblad
verlaten stopt het automatisch doorrijden. Als je een dier aan een touw meeneemt,
blijven de gangknoppen uitgeschakeld.

`node tests/gaits.cjs` controleert de knoppen, automatisch lopen, de oplopende
snelheden van stap/draf/galop, Halt en afstappen.
