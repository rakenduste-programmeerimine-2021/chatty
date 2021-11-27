# Reaalajas vestlusrakendus Chatty

## Autorid

* Harli Kodasma
* Margo Narõškin

## Eesmärk ja lühikirjeldus

Rakendus on loodud Tallinna Ülikoolis aine 'IFI6229 Rakenduste programmeerimine' raames lõpuprojektina 2021 sügissemestril.
Projekti eesmärk on luua veebirakendus, mis võimaldab kasutajatel omavahelist suhtlust eraviisiliselt (põhiliseks eeskujuks on võetud Facebook Messenger). Olenevalt sellest, kui keerukaks projekt osutub, on plaanis ka lisafunktsionaalsused - grupivestluste võimalus, meedia saatmise võimalus (pildid/videod) ning sõnumitele reageerimine ehk reactimine.

Avalehele minnes on võimalik kas uus kasutaja luua või olemasolevaga sisse logida. Pärast edukat sisselogimist on võimalik otsida teist kasutajat, kellega vestlust alustada. Vestlusaken on traditsiooniline - all tekstikast, kuhu sõnum kirjutada ning nupp, millega see teele saata (muidugi ka võimalus Enter klahviga seda teha). Vasakul eraldi reas oleksid kasutajate nimed, kellega juba on vestlust varasemalt alustatud ning sellele klikkides avaneb antud kasutajaga vestlusaken, kus muidugi on näha ka kõik varasemad sõnumid (kogu info salvestatakse andmebaasi). Sama listi kõige ülemises osas on otsing, kust leida uusi kasutajaid, kellega vestlust alustada. Kui jõuame sõnumitele reageerimise funktsionaalsuseni, siis iga sõnumi taga oleks ikoon, millele vajutades on võimalik valida mõni emoji, mis sõnumi külge nähtavale läheb ning samuti näidatakse, kes selle sinna lisas (jällegi nagu Messengeris). Jagatava meedia võimekust luues oleks need eraldi sõnumitena saadetavad ning on nähtavad täpselt nagu muud tekstid, mis chatti saadetud. Suure tõenäosusega ei ole selleni aega jõuda, et luua ka kogu varasemalt saadetud meedia eraldi nägemise võimalus.

## Wireframe'id

* Login vaade
![Login vaade](wireframes/login.jpg)

* Registreerimise vaade
![Registreerimine](wireframes/register.jpg)

* Avaleht peale sisselogimist
![Avaleht](wireframes/main.jpg)

* Vestlusaken
![Vestlus](wireframes/chat.jpg)

## Kasutatud tehnoloogiad

* Docker 19.03.8
* React 17.0.2
* NodeJS 16.13.0
* ExpressJS 4.17.1
* MongoDB 5.0
* CSS3

## Paigaldusjuhis (kuidas kasutada)

1. Sobivas asukohas olles lae projekt alla  
```git clone https://github.com/rakenduste-programmeerimine-2021/chatty.git```
2. Liigu ```backend``` kausta
```cd chatty/backend```
3. Lae alla vajalikud _package_'id
```npm install```
4. Liigu ```chatty``` kausta (frontend)
```cd ../chatty```
5. Lae alla vajalikud _package_'id
```npm install```
6. Liigu ```dev``` kausta
```cd ../dev```
7. Käivita Dockeri konteiner  
```docker-compose up```  
Front-end on kättesaadav port 3000 pealt, back-end port 8081 pealt - ehk lokaalselt avalehele pääsemiseks http://localhost:3000/