---
layout: default
permalink: /readme/
---

# Evidencat dhe përmbledhja e ngarkesës mësimore `online`

Aplikacioni për plotësimin e evidencave, kontrollin e orëve dhe gjenerimin e dokumenteve përdoret në shfletues, pa llogari përdoruesi.

[**Hap aplikacionin**](https://lslxslx.github.io/evon/)

## 1. Si përdoret formulari

### 01 · Të dhënat e evidencës

Plotësohen të dhënat bazë:

- Pedagog/e (titulli/grada dhe emri)
- Viti akademik.
- Lënda dhe programi i studimit.
- Cikli i studimit.
- Semestri.
- Data e fillimit të semestrit.

Data e fillimit të semestrit përdoret për llogaritjen automatike të javës së çdo regjistrimi.
Drejtuesi i departamentit plotësohet automatikisht nga `referenca.json` dhe nuk ndryshohet nga përdoruesi.

### 02 · Kreditet dhe ngarkesa

Vendosni kreditet për lëndën/modulin e zhvilluar, grupet për çdo kategori. Kur ka kredite, kërkohet të paktën një grup. 
Numri i grupeve plotësohet sipas ndarjes së miratuar nga dekanati dhe përfaqëson grupet për të cilat pedagogu realizon veçmas
ngarkesën e deklaruar. Orët e parashikuara llogariten sipas koeficientëve të tabelës 3 në Rregulloren e Zhvillimit Kurrikular dhe Mësimdhënies në UPT, të konfiguruar në `referenca.json`.

ECTS-të totale llogariten si shuma e krediteve të kategorive, pa shumëzim me numrin e grupeve.

### 03 · Regjistrimet e mësimit

Për çdo regjistrim plotësoni datën, numrin e studentëve të pranishëm, temën dhe orët e zhvilluara sipas kategorive.

- Java llogaritet automatikisht nga data e fillimit të semestrit. Mund ta korrigjoni manualisht; fshirja e vlerës rikthen llogaritjen automatike.
- Datat: nuk lejohen të dielat. Festat zyrtare nuk kontrollohen nga aplikacioni.
- Lab. dhe Praktikë shfaqen vetëm kur kategoria përkatëse ka kredite te seksioni 02.
- Zëvendësimet: shënoni kutinë përkatëse që regjistrimi të shfaqet me * në datën përkatëse. Sqarimet paraqiten në raportin narrativ.

Kolona “Shuma / dt.” mbledh orët e atij regjistrimi. Nëse ka disa regjistrime për të njëjtën datë, raporti narrativ i bashkon për kontrollin e totalit ditor.

### 04 · Verifikimi dhe dokumentet

Klikoni **Verifiko** për të kontrolluar plotësimin e formularit dhe
përputhjen e orëve faktike me orët e llogaritura sipas krediteve dhe grupeve.

Kolona **Mbeten (+) / Tejkalim (−)** tregon diferencën:

- Vlerë pozitive: mungojnë orë.
- Vlerë negative: janë tejkaluar orët.
- Zero: orët përputhen.

Pas verifikimit, **Shkarko evidencën dhe raportin** shkarkon një PDF
kur të dhënat janë të vlefshme, edhe nëse ka mungesa ose tejkalime orësh.
Gabimet në plotësimin e formularit bllokojnë gjenerimin.

## 2. Dokumenti që gjenerohet

### Evidenca mësimore

PDF-ja përmban të dhënat e lëndës, kreditet dhe grupet,
regjistrimet e mësimit, totalet e orëve dhe hapësirat për nënshkrim.
Datat paraqiten në formatin `dd.MM.yyyy`.

Kur ka diferenca, poshtë tabelës shfaqet:

- **Ngarkesë e realizuar pjesërisht** — kur ka vetëm mungesa orësh.
- **Ngarkesë me diferenca ndaj planit** — kur ka tejkalime, ose mungesa
  dhe tejkalime njëkohësisht.

Kur orët përputhen për çdo kategori, statusi nuk shfaqet.
Zëvendësimet shënohen me `*`; sqarimet paraqiten në raport.

Emri i skedarit: `Evidence_EmriLendes_EmriPedagogut.pdf`.

### Raporti narrativ

Raporti përfshihet në të njëjtin PDF dhe nis në faqe të re pas evidencës.
Përmban:

- Javët dhe intervalin e datave të mësimit.
- Orët faktike kundrejt orëve të përcaktuara sipas krediteve dhe grupeve,
  me mungesat ose tejkalimet për çdo kategori.
- Datat me mbi 8 orë mësimi gjithsej, të theksuara me të kuqe.
- Datat e zëvendësimeve dhe shënimet, nëse ka.
- Emrin e pedagogut.

Kategoritë me zero kredite dhe zero orë nuk shfaqen.
Datat e shënuara me `*` paraqiten edhe kur nuk janë shtuar sqarime.
Përputhja e totalit nuk nënkupton përputhjen e secilës kategori.

## 3 · Vazhdoni më vonë

- **Shkarko draftin** — ruan të dhënat e formularit si skedar JSON.
- **Hap draftin** — ngarkon një draft të ruajtur për të vazhduar plotësimin.
- **Formular i ri** — pastron formularin për një evidencë tjetër.
- **Përmbledhja e ngarkesës mësimore** — hap faqen e përmbledhjes në një skedë të re.

Formulari nuk ruhet automatikisht. Shkarkoni draftin përpara se të mbyllni ose rifreskoni faqen.

Emri i skedarit: `formular_evidence_dtshkarkimi.json`.

Drafti përdoret për të rikthyer formularin; nuk është JSON-i përmbledhës që importohet te faqja e përmbledhjes.

## 4 · Kodi QR

Kodi QR vendoset vetëm te evidenca dhe përmban të dhënat
përmbledhëse: pedagogun, lëndën, programin, vitin akademik, semestrin,
ciklin dhe, për çdo kategori me kredite, kreditet, numrin e studentëve,
grupet dhe orët faktike.

QR-ja përmban orët faktike dhe një shenjë që tregon nëse ato
përputhen me orët e parashikuara për çdo kategori.
Nuk përmban orët e parashikuara ose diferencat numerike.

QR-ja përdoret për të shtuar evidencën te faqja
**Përmbledhja e ngarkesës mësimore**, përmes kamerës,
ngarkimit të fotos ose PDF-së.

Kodi përmban të dhëna, jo një lidhje interneti. Për importim përdorni
lexuesin e faqes së përmbledhjes.

QR-ja nuk përmban regjistrimet e plota të mësimit dhe nuk zëvendëson
draftin JSON të formularit.

## 5 · Përmbledhja e ngarkesës mësimore

Kjo faqe mbledh evidencat sipas pedagogut, vitit akademik dhe semestrit.

### Leximi dhe shtimi i evidencave

Te **01 · Lexo evidencën**, zgjidhni një mënyrë:

- **Skano QR** — lexon kodin me kamerën.
- **Ngarko foto QR** — lexon kodin nga një imazh.
- **Ngarko PDF** — lexon QR-në nga një ose disa PDF të përzgjedhura.
- **Ngarko JSON** — importon një ose disa skedarë JSON përmbledhës.

PDF-të duhet të përmbajnë kodin QR të aplikacionit. Ngarkoni një
PDF për çdo evidencë; leximi ndalon te QR-ja e parë e vlefshme.

Evidencat paraqiten me radhë te **02 · Kontrollo evidencën**.
Kontrolloni të dhënat dhe klikoni **Shto në përmbledhje**,
ose **Kalo / Mbyll** për të mos e shtuar evidencën.

Ngarkimi i skedarëve nuk i shton automatikisht evidencat në përmbledhje.

### Si llogaritet përmbledhja

Te **03 · Përmbledhja**, filtroni evidencat sipas pedagogut,
vitit akademik dhe semestrit.

Për çdo kategori:

- **Studentët:** merret numri maksimal i regjistruar në secilën
  evidencë dhe mblidhet për kategoritë me kredite.
- **Grupet:** mblidhen grupet e deklaruara në evidencat përkatëse.
- **Orët:** mblidhen orët faktike, pa i shumëzuar përsëri me grupet. Nëse importohet evidencë me ngarkesë të papërfunduar, përfshihen vetëm orët e realizuara deri në atë moment.

Numri i studentëve është një total sipas evidencave,
jo numër studentësh unikë ndërmjet lëndëve.

Tabela paraqet shumën e orëve në auditor, shumën e orëve
mbështetëse dhe totalin e përgjithshëm.
Zërat 6–10 nuk plotësohen automatikisht nga formulari aktual.

Te **04 · Evidencat e përfshira** mund të shihni evidencat
që përbëjnë përmbledhjen.

### Evidencat e përsëritura

Aplikacioni identifikon evidencën sipas pedagogut, lëndës,
programit, vitit akademik, semestrit dhe ciklit.

Një evidencë identike nuk shtohet dy herë.
Nëse të dhënat e saj kanë ndryshuar, kërkohet konfirmim
për zëvendësimin e versionit të ruajtur.

### Eksportimi

- **Eksporto të gjitha evidencat** — ruan regjistrin e plotë
  si JSON, për kopje rezervë ose transferim në një pajisje tjetër.
- **Eksporto tabelën CSV** — ruan vetëm tabelën e seksionit 03,
  sipas filtrave të zgjedhur.
- **Eksporto JSON** te seksioni 04 — ruan vetëm evidencën përkatëse.

CSV-ja përdor pikëpresjen (`;`) si ndarës. Për të shmangur
problemet e karaktereve gjatë hapjes në Excel, ë/ç dhe simbolet
e veçanta zëvendësohen me forma të thjeshta.

### Shkresa e realizimit të ngarkesës mësimore

Te **05 · Shkresa e realizimit të ngarkesës mësimore**, përdoren
evidencat e përzgjedhura te seksioni 03.

Shkresa gjenerohet vetëm kur të gjitha evidencat e përzgjedhura
kanë përputhje të plotë orësh për çdo kategori. Mungesat ose
tejkalimet e bllokojnë shkresën, por jo importimin në përmbledhje.

Evidencat e vjetra, pa shenjën e përputhjes në QR, duhen
gjeneruar dhe importuar sërish për t’u përdorur në shkresë.

Plotësoni:

- **Statusi (PAE/PAK)**.
- **Grupi mësimor**.
- **Norma mësimore**, sipas kategorisë ose funksionit.

Emri, viti akademik dhe tabela e ngarkesës merren
automatikisht nga evidencat e përzgjedhura.

Totali përfshin orët në auditor dhe orët mbështetëse, përfshirë praktikën kur ka.

Kur norma nuk tejkalohet, shkresa nuk përfshin kërkesën
për pagesë të orëve mbi normë.

Klikoni **Gjenero shkresën** për ta shkarkuar drejtpërdrejt si PDF.
Nëse ndryshoni evidencat ose të dhënat, gjenerojeni përsëri.

Emrat e drejtuesve dhe lista e normave merren nga `referenca.json`.

Përpara gjenerimit, sigurohuni që keni përfshirë të gjitha evidencat
e nevojshme.

## 6 · Ruajtja e të dhënave

Aplikacioni nuk ka llogari përdoruesish ose arkiv të përbashkët.

- **Formulari** nuk ruhet automatikisht. Për ta vazhduar më vonë,
  shkarkoni draftin JSON.
- **Përmbledhja** ruhet në `localStorage`, në shfletuesin dhe
  pajisjen ku po punoni. Nuk sinkronizohet me pajisje të tjera.

Pastrimi i të dhënave të shfletuesit mund të fshijë përmbledhjen.
Në shfletim privat, ruajtja mund të jetë e përkohshme.

Për kopje rezervë përdorni **Shkarko draftin** për formularin
dhe **Eksporto të gjitha evidencat** për përmbledhjen.

## 7 · Përdorimi i kamerës

Lejoni përdorimin e kamerës kur e kërkon shfletuesi.
Vendoseni QR-në të plotë brenda pamjes, me ndriçim të mirë
dhe pa reflektime. Mbajeni pajisjen të qëndrueshme dhe
rregulloni gradualisht largësinë që kodi të fokusohet.

Nëse skanimi është i vështirë, përdorni **Ngarko PDF**
me dokumentin origjinal ose **Ngarko foto QR** me një imazh të qartë.

## 8 · Publikimi dhe konfigurimi

Aplikacioni publikohet në GitHub Pages dhe përdoret nga shfletuesi,
pa instalim dhe pa identifikim.

Skedari `referenca.json`, në direktorinë kryesore, përmban:

- Emrat e drejtuesit të departamentit, dekanit dhe administratorit.
- Koeficientët e llogaritjes së orëve sipas ciklit.
- Kategoritë që shumëzohen me numrin e grupeve.
- Listën e normave mësimore sipas kategorisë ose funksionit.

Ndryshimet e konfigurimit nuk përditësojnë dokumentet e shkarkuara
ose evidencat e ruajtura më parë në përmbledhje.

**Versioni:** `202611.11 3L`

## 9 · Kufizime

- Një formular lejon deri në 100 regjistrime mësimore.
- PDF-ja kërkon të dhëna të vlefshme; mungesat ose tejkalimet e orëve paraqiten në dokument.
- Verifikimi kontrollon të dhënat dhe llogaritjet; nuk vërteton
  zhvillimin e mësimit ose miratimin e ngarkesës.
- QR-ja përmban vetëm të dhënat përmbledhëse, jo formularin e plotë.
- Evidencat me shumë regjistrime mund të shtrihen në disa faqe.
- Për ngarkimin e bibliotekave të jashtme nevojitet lidhje interneti.

## 10 · Rrjedha e përdorimit

**Plotëso formularin → Verifiko → Shkarko evidencën dhe raportin →
Importo në përmbledhje → Kontrollo totalet → Gjenero shkresën.**
