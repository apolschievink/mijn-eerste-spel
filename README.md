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

Een nieuwe boerderij heeft tien dieren: twee per soort, inclusief paarden.
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
