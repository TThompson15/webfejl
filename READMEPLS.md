# Webfejlesztési keretrendszerek
## Beadandó - 1. mérföldkő

### Saját értékelésem az alkalmazásról (firebase és google térkép api beleépítve) _(is anyone gonna read me? lol)_

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

#### ✅ Alkalmazás felbontása megfelelő számú komponensre
*(egyetlen komponens TS és HTML kódja sem haladja meg a 250 sort és soronként a 400 karaktert)*
- **True, imo**

#### ✅ Reszponzív, mobile-first felület
*(minden adat látható és jól jelenik meg böngészőben is, mobil nézetben is)*
- **True, imo**

#### ✅ Legalább 2 különböző attribútum direktíva használata
- Több helyen is, de pl. **`report.component.html`** fájlban:
  - `*ngIf`
  - `*ngFor`

#### ✅ Legalább 2 különböző beépített vezérlési folyamat használata
*(if, switch, for)*
- **Kinda same, nem? 😃**
- A legtöbb logikát leíró **`.ts`** fájlban találhatóak.

#### ✅ Adatátadás szülő és gyermek komponensek között
*(legalább 1 @Input és 1 @Output)*
- **@Input**: `message.card.components.ts`
- **@Output**: `address.autocomplete.components.ts`

#### ✅ Legalább 10 különböző Material elem helyes használata
- Az összes **`.html`** fájl használja ezeket.
- `material.module.ts` fájlban sok **behúzott modul**, **> 10**

#### ✅ Adatbevitel Angular form-ok segítségével megvalósítva *(legalább 2)*
- **Regisztráció** + **login** → **1-1 form**

#### ✅ Legalább 1 saját Pipe osztály írása és használata
- **pipes** mappában **2 Pipe osztály**:
  - **Telefonszám** formázás
  - **Név** nagybetűsítése

---

### Ha bármi gond lenne, akkor
**Discord:** `tthompson15`
## (az md fájl tartalma by én, formázás by ChatGPT)