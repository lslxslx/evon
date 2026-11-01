---
layout: default
permalink: /readme/
---

# Evidencat dhe përmbledhja e ngarkesës mësimore `online`

Aplikacion për plotësimin e evidencave, kontrollin e orëve dhe gjenerimin e dokumenteve. Përdoret në shfletues, pa llogari përdoruesi.

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
ngarkesën e deklaruar. Orët e parashikuara llogariten sipas koeficientëve të konfiguruar në `referenca.json`, bazuar në Rregulloren e Zhvillimit Kurrikular dhe Mësimdhënies në UPT.

| Kategoria | Cikli I | Cikli II |
|---|---|---|
| Leksione | Kredite × 12 × grupe | Kredite × 10 × grupe |
| Seminare | Kredite × 14 × grupe | Kredite × 12 × grupe |
| Laboratorë | Kredite × 20 × grupe | Kredite × 20 × grupe |
| Detyra/projekte | Kredite × 5 × grupe | Kredite × 5 × grupe |
| Praktikë | Kredite × 20 × grupe | Kredite × 20 × grupe |

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

Pas verifikimit pa gabime, aktivizohen:
- **PDF / Print** — shkarkon evidencën në PDF.
- **Gjenero raport** — hap raportin narrativ në një skedë të re.

## 2. Dokumentet që gjenerohen

### PDF / Print — Evidenca mësimore

Shkarkon evidencën në PDF, me të dhënat e lëndës, kreditet dhe grupet,
regjistrimet e mësimit, totalet e orëve dhe hapësirat për nënshkrim.
Datat paraqiten në formatin `dd.MM.yyyy`.

Zëvendësimet shënohen me `*`; sqarimet përkatëse paraqiten vetëm në raportin narrativ.

Kodi QR përmban të dhënat përmbledhëse të evidencës për t’u importuar te faqja **Përmbledhja e ngarkesës mësimore**.

Emri i skedarit: `Evidence_EmriLendes_EmriPedagogut.pdf`.

### Gjenero raport — Raporti narrativ

Hap raportin në një skedë të re, duke ruajtur formularin të plotësuar.

Raporti përmban:
- Javët dhe intervalin e datave të mësimit.
- Orët faktike kundrejt orëve të përcaktuara sipas krediteve dhe grupeve.
- Datat me mbi 8 orë mësimi gjithsej, të theksuara me të kuqe.
- Datat e zëvendësimeve dhe shënimet, nëse ka.
- Deklarimin, emrin e deklaruesit dhe kodin QR.

Kategoritë me zero kredite dhe zero orë nuk shfaqen.
Datat e shënuara me `*` paraqiten edhe kur nuk janë shtuar sqarime.

Për printim ose ruajtje si PDF, përdorni menunë e shfletuesit:
**⌘P** në Mac, **Ctrl+P** në Windows ose **Share → Print** në iPhone/iPad.

Emri i raportit: `Raport_EmriLendes_EmriDeklaruesit`.

## 3 · Vazhdoni më vonë

- **Shkarko draftin** — ruan të dhënat e formularit si skedar JSON.
- **Hap draftin** — ngarkon një draft të ruajtur për të vazhduar plotësimin.
- **Formular i ri** — pastron formularin për një evidencë tjetër.
- **Përmbledhja e ngarkesës mësimore** — hap faqen e përmbledhjes në një skedë të re.

Formulari nuk ruhet automatikisht. Shkarkoni draftin përpara se të mbyllni ose rifreskoni faqen.

Emri i skedarit: `formular_evidence_dtshkarkimi.json`.

Drafti përdoret për të rikthyer formularin; nuk është JSON-i përmbledhës që importohet te faqja e përmbledhjes.

## 4 · Kodi QR

Evidenca PDF dhe raporti narrativ përmbajnë një kod QR me të dhënat
përmbledhëse: pedagogun, lëndën, programin, vitin akademik, semestrin,
ciklin dhe numrin e studentëve, grupeve e orëve sipas kategorive.

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

PDF-të duhet të përmbajnë kodin QR të aplikacionit.

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
- **Orët:** mblidhen orët faktike, pa i shumëzuar përsëri me grupet.

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
- **Raporti narrativ** përdor një kopje të përkohshme për hapjen
  e skedës së re dhe ruan kopjen e vet gjatë sesionit të asaj skede.
  Kjo nuk ruan automatikisht formularin.

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

Për ndryshimin e këtyre të dhënave, përditësoni vlerat në JSON,
duke ruajtur strukturën dhe emërtimet e fushave.

Ndryshimet e konfigurimit nuk përditësojnë dokumentet e shkarkuara
ose evidencat e ruajtura më parë në përmbledhje.

**Versioni:** `2026.11.3l`

## 9 · Kufizime

- Një formular lejon deri në 100 regjistrime mësimore.
- Dokumentet gjenerohen pasi formulari kalon verifikimin
  dhe orët faktike përputhen me ato të parashikuara.
- Verifikimi kontrollon të dhënat dhe llogaritjet; nuk vërteton
  zhvillimin e mësimit ose miratimin e ngarkesës.
- QR-ja përmban vetëm të dhënat përmbledhëse, jo formularin e plotë.
- Evidencat me shumë regjistrime mund të shtrihen në disa faqe.
- Për ngarkimin e bibliotekave të jashtme nevojitet lidhje interneti.

## 10 · Rrjedha e përdorimit

**Plotëso formularin → Verifiko → Shkarko evidencën → Importo në përmbledhje → Kontrollo totalet → Gjenero shkresën.**
