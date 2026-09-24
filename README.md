# Moja Droga

Notatnik drogi w islamie + nauka angielskiego B1-B2. Aplikacja PWA (dziala offline i aktualizuje sie automatycznie).

**Strona:** https://gpilch1611.github.io/Moja-Droga/

## Struktura

- `index.html` — markup widokow (islam + angielski) i overlaye
- `css/style.css` — wszystkie style (motyw jasny/ciemny/systemowy, animacje)
- `js/state.js` — stan, storage (`mdv4`), motyw, widoki, toast
- `js/islam-data.js` — dane islamu + slownik i18n (`IS`, klucze pl/en)
- `js/islam.js` — silnik godzin modlitw, render sekcji islam
- `js/eng-data.js` / `js/eng.js` — tematy B1/B2 i render sekcji angielskiej
- `js/progress.js` — aktywnosc, seria, kamienie milowe, profil, konfetti, animacje
- `js/features.js` — cel dzienny, przypomnienia, wake lock, kopiowanie, udostepnianie, kopie, strefa ryzyka, tryb offline, skroty
- `sw.js` — Service Worker (auto-update, precache)
- `tools/bump-sw.js` — podbicie wersji cache + test dymny
- `test/smoke.js` — test dymny (zasoby, skladnia, id, i18n, manifest, precache)

## Test

	node test/smoke.js

## Aktualizacja

Po edycji plikow:

	git add -A; git commit -m 'opis'; git push

Aplikacja na telefonie pobierze nowa wersje automatycznie przy kolejnym otwarciu.
Po zmianach w `js/` warto podbic wersje cache:

	node tools/bump-sw.js

## Skroty i glebsze linki

- `index.html?go=prayers` — czas modlitw, `?go=prayer` — modlitwa krok po kroku, `?go=eng` — angielski
- `index.html?go=eng&topic=<id>&lv=b1|b2` — bezposrednie wejscie w temat angielskiego
- Na komputerze: `1` — sekcja Islam, `2` — Angielski, `ArrowLeft` — wstecz, `Esc` — zamknij overlay
