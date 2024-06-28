[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/1IMeAlJr)
##Opis

MSBeauty je veb aplikacija za upravljanje rezervacijama u salonu lepote. Korisnici mogu da vide sve dostupne usluge u salonu, njegovu lokaciju, informacije o osoblju salona i dva radnika meseca, zatim da kontaktiraju osoblje slanjem poruka, registruju se ili prijave na sistem. Ulogovani korisnici mogu da vide sve pretgodne rezervacije, kreiranju novu za željenu uslugu u nekom od slobodnih termina i preuzmu .csv fajl koji sadrži informacije o njihovim rezervacijama. Administrator i šminkeri mogu da vide sve korisnike sistema i usluge grupisane po tipu. Samo administratori mogu da promene ulogu korisnika. Aplikacija koristi Laravel za backend i React za frontend deo. 

##Instalacija

###React
- npm i react-router-dom - Instalira React Router biblioteku koja se koristi za upravljanje navigacijom i rutiranjem u aplikacijama baziranim na React-u.
- npm i react-icons - Instalira biblioteku React Icons koja sadrži razne ikone iz popularnih biblioteka (Facebook, Instagram, Twitter, Linkedin, Mapa, Download, Phone...)
- npm install react-bootstrap bootstrap - Instalira React-Bootstrap i Bootstrap CSS framework za kreiranje responzivnih i stilizovanih korisnickih interfejsa.
- npm i axios - Instalira Axios biblioteku. Preko Axios instance se iz React aplikacije salju HTTP zahtevi serveru.
- npm i react-datepicker - Instalira React Datepicker komponentu koja omogućava jednostavno dodavanje polja za unos datuma sa interfejsom za odabir.
- npm install --save @emailjs/browser - Instalira EmailJS biblioteku za slanje emailova direktno iz browsera.
- npm install --save react-google-charts - Instalira React Google Charts biblioteku koja omogućava jednostavno kreiranje i prikazivanje raznih tipova grafova i dijagrama (usluge grupisane po tipu).
- npm i react-csv - Instalira React CSV biblioteku koja omogućava jednostavno preuzimanje podataka u CSV formatu (preuzimanje rezervacija).

###Laravel 
- composer global require laravel/installer - Instalacija Laravel-a
- composer create-project --prefer-dist laravel/laravel - Ova komanda kreira novi direktorijum sa svim potrebnim datotekama za Laravel aplikaciju.
- composer require laravel/sanctum - Ova komanda instalira Laravel Sanctum paket. Sanctum omogućava lako kreiranje i upravljanje API tokenima za korisnike.

##Pokretanje projekta
1. Laravel backend: php artisan serve
2. React frontend: npm start 

##Struktura aplikacije

###React
- 'src/components' - Komponente koje se koriste u aplikaciji: AboutUsCard, Navigation, Footer
- 'src/pages' - Stranice aplikacije: Home, AboutUs, Services, Contact, Login, Reservations, Admin
- 'src/axios-instance/axios-call.js - Sadrzi konfiguraciju Axios instance koja se koristi za slanje HTTP zahteva prema serveru (na adresi: [http://127.0.0.1:8000] )
- 'src/App.js' - Definise rute i strukturu aplikacije
- 'src/index.js' - Montiranje glavne App komponente na root element u DOM-u

###Laravel
- 'app/Http/Controllers' - Sadrzi kontrolere koji definisu ponasanje ruta: LoginController, ReservationController, ServiceController, TypeController
- 'app/Http/Models' - Sadrzi modele: Reservation, Service, Type, Slot i User
- 'app/Http/Resources' - Sadrzi resurse koji odredjuju koje informacije ce se prikazati korisniku putem API-a: ReservationResource, ServiceResource, TypeResource, SlotResource, UserResource
- 'routes' - Definicija ruta API-ja
- 'database' - Migracije i Seeder-i za bazu podataka

##Funkcionalnosti

-**Pregled usluga**: Korisnici mogu da pregledaju dostupne usluge salona na stranici Services.
-**Registracija i prijava**: Korisnici se mogu registrovati i prijaviti na sistem (stranica Login) kako bi mogli da rezervisu zeljenu uslugu.
-**Pregled rezervacija**: Ulogovani korisnici mogu videti svoje prethodne rezervacije.
-**Rezervacija usluge**: Ulogovani korisnici, izborom datuma, slobodnog termina tog dana i zeljene usluge mogu kreirati novu rezervaciju.
-**Preuzimanje rezervacija u .csv fajlu**: Ulogovani korisnici mogu preuzeti .csv fajl koji sadrzi informacije o svim rezervacijama.
-**Promena uloge korisnika u sminkera**: Administrator mogu promeniti ulogu korisnika u sminkera na stranici Admin.
-**Pregled svih korisnika**: Sminkeri i administrator mogu da vide sve korisnike na stranici Admin.
-**Pregled grupisanih usluga po tipu**: Sminkeri i administrator na stranici Admin mogu videti graficki prikaz usluga grupisanih po tipu.
-**Slanje poruke radnicima salona**: Svi korisnici mogu kontaktirati osoblje slanjem poruke putem EmailJS veb servisa.
-**Odjava**: Svi ulogovani korisnici se mogu odjaviti sa sistema.

##Komunikacija izmedju komponenti

- Koristi se: 1. 'useState' hook za pracenje stanja komponenti.
              2. 'useEffect' hook za slanje HTTP zahteva serveru.
              3. 'useForm' custom hook za upravljanje stanjem forme na stranici Contact, Login i Reservations i azuriranje polja na formi nakon sto korisnik unese odredjene vrednosti.
- Axios se koristi za slanje HTTP zahteva ka serveru.
- React Router se koristi za navigaciju izmedju stranica.

##Povezivanje sa bazom podataka
Aplikacija koristi MySQL bazu podataka putem Laravel Eloquent ORM-a. Baza podataka sadrzi tabele korisnika, rezervacija, usluga, tipova usluga i termina. Povezivanje sa bazom se vrsi kroz konfiguracioni fajl '.env' 

  
