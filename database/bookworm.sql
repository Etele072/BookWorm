DROP DATABASE if exists bookworm;

CREATE DATABASE bookworm
DEFAULT CHARACTER set utf8
COLLATE utf8_hungarian_ci;

use bookworm;

CREATE TABLE books(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    release_date VARCHAR(255),
    author VARCHAR(255),
    description VARCHAR(400)
);

INSERT INTO books (title,release_date,author,description)
VALUES
("A kék liget",2018,"Tóth-Zelei Margit","Egy varázslatos, melankolikus történet egy rejtett erdőről, ahol a fák levelei sosem zöldülnek ki, és a csend olyan mély, hogy a gondolatok is hallhatóvá válnak. A főhős egy ősi titkot próbál megfejteni, miközben rájön, hogy a liget az ő saját múltjának is szerves része."),
("Fitymatyi Kalandjai",2005,"Kormos Dénes","Egy humoros és pörgős gyerekkönyv, amelyben a furfangos és örökmozgó Fitymatyi mindennapi, mégis abszurd kalandokba keveredik a modern világ útvesztőiben. Vajon sikerül-e a kis hősnek leleményességével mindig egy lépéssel a felnőttek esze előtt járnia?"),
("A Rákok",2021,"Sándorfi Bence","Szürreális disztópia egy olyan társadalomról, amely egy ideológiai vita miatt hirtelen kettészakad, és a sebeket csak ideiglenes, felszínes megoldásokkal próbálják összefércelni. A regény a túlélésről és az emberi kapcsolatok megbonthatatlan, mégis törékeny hálójáról mesél."),
("A Perzselő Csend",2015,"Kovács K. Sándor","Kíméletlen lélektani thriller, mely egy elhagyatott sivatagi kisvárosban játszódik, ahol a tikkasztó hőség és az elzártság lassan az őrületbe kergeti a lakókat. Amikor egy titokzatos idegen érkezik a poros utcákra, a felszín alatti feszültségek robbanásszerűen törnek a felszínre."),
("A Hamu 12 Árnyalata",2019,"Varga L. Zsófia","Sötét, noir hangulatú krimi egy kiégett nyomozóról, aki egy tizenkét lépésből álló, rejtélyes gyilkosságsorozat szálait próbálja felgöngyölíteni a cigarettafüstös éjszakában. Minden elszívott szál egy újabb nyom, de az idő egyre fogy a végső leszámolásig."),
("Hogyan neveljünk időutazót",2023,"Dr. Halász Gergely","Szórakoztató, de elgondolkodtató fiktív útmutató szülőknek, akiknek a gyermeke véletlenül felfedezi a negyedik dimenziót és a házi feladat elől a múltba menekül. A könyv humorosan járja körbe a téridő-kontinuum paradoxonai és a klasszikus dackorszak egyidejű kihívásait."),
("Elfeledett utcák",2012,"Nemes Anna","Atmoszferikus városi fantasy, amely bemutatja a metropoliszok rejtett, szürke dimenzióját, ahová a mindennapi rohanásból kiesett emberek és elveszett tárgyak kerülnek. A történet főhőse egy térképész, aki az árnyékvilág feltérképezésére vállalkozik, hogy megtalálja eltűnt testvérét."),
("Kristály",2008,"B. Károly","Letisztult misztikus dráma egy különleges, jéghideg szépségű lányról, akinek puszta érintése szó szerint megfagyasztja a körülötte lévő világot. Gyönyörű történet az elszigetelődésről, a másságról és a valódi kötődések kereséséről egy elidegenedett társadalomban."),
("Epstein files",2025,"John R. Harrison","Kőkemény tényfeltáró dokumentumkönyv, amely a kiszivárgott akták és bírósági iratok alapján mutatja be a modern kor egyik legsötétebb botrányát. A szerző kíméletlen őszinteséggel rántja le a leplet a nemzetközi elit összefonódásairól és a hatalom árnyékában zajló visszaélésekről."),
("A CSALÓ",2022,"Jimmy J. Jhonson","Feszült ifjúsági fantasy egy olyan elit akadémián, ahol mindenki valódi mágikus képességekkel bír – kivéve a főhőst, aki pusztán az eszével, trükkökkel és bűvészettel veri át a tanárait. A tét hatalmas: ha lebukik, az nemcsak a kicsapását, hanem az életét is jelentheti.");

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    role ENUM('admin', 'user') DEFAULT 'user'
);


INSERT INTO users (username,email,password,role)
VALUES
("admin","admin@admin.hu","$argon2i$v=19$m=16,t=2,p=1$MERDNmhDb09FaEVsOHg0YQ$vhnGEje4mdpwGNymOY44eQ","admin");

CREATE TABLE favourites(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    book_id INT
)
