# Webfejlesztési keretrendszerek
## Beadandó - 2. mérföldkő

### Saját értékelésem az alkalmazásról  _(is anyone gonna read me? lol)_

#### ✅ Fordítási hiba nincs _(ng serve kiadásakor nincs hiba)_
- A kód fordul, **fordítási hiba nincs** _(legalábbis nálam xd)_

#### ✅ Futtatási hiba nincs _(böngésző konzol részében nincs hiba)_
- A kód fut, **szintén nincs futási hiba** _(nálam xd)_

#### ✅ Adatmodell definiálása
_(legalább 4 TypeScript interfész vagy class formájában (ugyanennyi kollekció))_
- **models** mappában **4 db**:
  - `AlertMessage`
  - `AppSettings`
  - `MeterLimit`
  - `UserProfile`
- **gas-reading.service.ts** fájlban: `GasReading`


#### ✅ Reszponzív, mobile-first felület
*(minden adat látható és jól jelenik meg böngészőben is, mobil nézetben is)*
- **True, imo**

#### ✅ Legalább 4, de 2 különböző attribútum direktíva használata
- Több helyen is, de pl. **`report.component.html`** fájlban:
  - `*ngIf`
  - `*ngFor`

#### ✅ Legalább 4, de 2 különböző beépített vezérlési folyamat használata
*(if, switch, for)*
- **Kinda same, nem? 😃**
- A legtöbb logikát leíró **`.ts`** fájlban találhatóak.

#### ⚠️ Adatátadás szülő és gyermek komponensek között
*(legalább 3 @Input és 3 @Output)*
- **@Input**: `message.card.components.ts`
- **@Output**: `address.autocomplete.components.ts`
- Csak 1-1 van, nincs 3db ❌

#### ✅ Legalább 10 különböző Material elem helyes használata
- Az összes **`.html`** fájl használja ezeket.
- `material.module.ts` fájlban sok **behúzott modul**, **> 10**

#### ✅ Adatbevitel Angular form-ok segítségével megvalósítva *(legalább 4)*
- **Regisztráció** + **login** + **diktálás** + **profil** → **4 form**

#### ✅ Legalább 2 saját Pipe osztály írása és használata
- **pipes** mappában **2 Pipe osztály**:
  - **Telefonszám** formázás
  - **Név** nagybetűsítése

#### ✅ Legalább 2 különböző Lifecycle Hook használata a teljes projektben (értelmes tartalommal, nem üresen)
- report.component.ts
- app.component.ts

#### ⚠️ CRUD műveletek mindegyike megvalósult legalább a projekt fő entitásához (Promise, Observable használattal)
- Create: diktálás
- Read: szintén, diktálás
- Update: profil adatok
- Delete: nincs ❌

#### ✅ CRUD műveletek service-ekbe vannak kiszervezve és megfelelő módon injektálva lettek
- **True, imo**

#### ✅ Legalább 4 komplex Firestore lekérdezés megvalósítása (ide tartoznak: where feltétel, rendezés, léptetés, limitálás)
- gas-reading.service.ts

#### ✅ Legalább 4 különböző route a különböző oldalak eléréséhez
- app.routes.ts

#### ✅ AuthGuard implementációja
- auth.guard.ts

#### ✅ Legalább 2 route levédése azonosítással (AuthGuard) (ahol ennek értelme van, pl.: egy fórum témakör megtekinthető bárki számára, de a regisztrált felhasználó adatai nem)
- app.routes.ts

#### ⚠️ Szubjektív pontozás a projekt egészére vonatkozólag (mennyire fedi le a projekt a témakört (mennyire kapcsolódik hozzá), mennyi lehet a befektetett energia a projektben) 
- Whatever you like 😃

---

### Ha bármi gond lenne, akkor
**Discord:** `tthompson15`
## (az md fájl tartalma by én, formázás by ChatGPT)
### (TÉVEDHETEK, NE CSAK EZ ALAPJÁN AZ ÖNÉRTÉKELÉS ALAPJÁN PONTOZZ!!)
## (látszik hogy az első fele szebben formázott, mert ez az első mf-nek is a része volt, ami új, azt nem formáztam meg. Shame on me I guess...)