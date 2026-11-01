---
layout: default
permalink: /readme/
---

# Evidencat dhe përmbledhja e ngarkesës mësimore `online`

Aplikacion për plotësimin e evidencave mësimore, verifikimin e orëve, gjenerimin e dokumenteve dhe përmbledhjen e ngarkesës së pedagogëve. Hapet pa identifikim dhe punon në shfletues.

[**Hap aplikacionin**](https://lslxslx.github.io/evon/)

## 1. Si përdoret formulari

### 01 · Të dhënat e evidencës

Plotësohen pedagogu, viti akademik, lënda, programi, cikli, semestri dhe data e fillimit të semestrit. Drejtuesi i departamentit merret automatikisht nga `referenca.json` dhe nuk ndryshohet në formular.

Universiteti, fakulteti dhe departamenti paraqiten në krye. Data e fillimit të semestrit përdoret për llogaritjen e javëve.

### 02 · Kreditet dhe ngarkesa

Vendosen kreditet dhe numri i grupeve për leksione, seminare, laboratorë, detyra/projekte dhe praktikë. Sipas konfigurimit aktual, lejohen deri në 6 grupe për kategori; kur ka kredite, kërkohet të paktën një grup.

Orët e parashikuara llogariten sipas këtyre formulave:

| Kategoria | Cikli I | Cikli II |
| --- | --- | --- |
| Leksione | Kredite × 12 × grupe | Kredite × 10 × grupe |
| Seminare | Kredite × 14 × grupe | Kredite × 12 × grupe |
| Laboratorë | Kredite × 20 × grupe | Kredite × 20 × grupe |
| Detyra/projekte | Kredite × 5 | Kredite × 5 |
| Praktikë | Kredite × 20 | Kredite × 20 |

Koeficientët, shumëzimi me grupet dhe maksimumi i grupeve konfigurohen në `referenca.json`. ECTS totale është shuma e krediteve, pa shumëzim me grupet.

### 03 · Regjistrimet e mësimit

Për çdo regjistrim plotësohen data, numri i studentëve, tema, orët sipas kategorive dhe shenja e zëvendësimit, kur nevojitet.

- Java propozohet sipas intervaleve 7-ditore nga fillimi i semestrit. Mund të korrigjohet; fshirja e vlerës rikthen llogaritjen automatike.
- Datat e mësimit nuk lejohen të bien të dielën. Kontrolli zbatohet edhe për draftet e importuara. Festat zyrtare nuk kontrollohen automatikisht.
- Laboratori dhe praktika shfaqen kur kategoritë përkatëse kanë kredite.
- “Shuma / dt.” mbledh orët e regjistrimit. Raporti narrativ bashkon regjistrimet e së njëjtës datë për kontrollin e totalit ditor.
- Zëvendësimet shënohen me `*`. Fusha e shënimeve përdoret për sqarime dhe referenca shkresash.

### 04 · Verifikimi dhe dokumentet

**Verifiko** kontrollon plotësimin e të dhënave dhe përputhjen e orëve faktike me ato të parashikuara për çdo kategori.

**Diferenca = Orët e parashikuara − Orët faktike.** Vlera pozitive tregon orë të paplotësuara, negative tejkalim dhe zero përputhje.

Dokumentet gjenerohen pasi verifikimi përfundon pa gabime.

## 2. Dokumentet që gjenerohen

### PDF / Print — Evidenca tabelore

Butoni gjeneron dhe shkarkon drejtpërdrejt PDF-në me të dhënat e lëndës, kreditet, grupet, regjistrimet, totalet, deklaratën, emrat për firmosje dhe QR-në.

Datat paraqiten si `dd.MM.yyyy`. Për zëvendësimet mbetet vetëm simboli `*`; teksti i shënimeve paraqitet te raporti narrativ.

Emri i skedarit: `Evidence_EmriLendes_EmriPedagogut.pdf`. Hapësirat dhe karakteret e papërshtatshme zëvendësohen me `_`.

### Gjenero raport — Raporti narrativ

Hapet në një skedë të re dhe përmbledh javët me regjistrime, datën e parë dhe të fundit, orët faktike kundrejt atyre të përcaktuara sipas krediteve dhe totalin. Datat me më shumë se 8 orë theksohen me të kuqe; kategoritë me zero kredite nuk shfaqen në përshkrimin e orëve.

Datat e zëvendësimeve merren nga regjistrimet me `*` dhe paraqiten pa përsëritje, edhe kur nuk ka shënime. Teksti shtesë shfaqet me etiketën **Shënime:**. Kur nuk ka regjistrime të shënuara, shfaqet “Nuk janë bërë zëvendësime.” Raporti përmban edhe deklaratën, emrin e deklaruesit dhe QR-në.

Për printim ose ruajtje si PDF përdorni `⌘P` në Mac, `Ctrl+P` në Windows ose **Share / Ndaj → Print** në iPhone/iPad.

Emri i raportit: `Raport_EmriLendes_EmriDeklaruesit`. Skeda mund të printohet disa herë; mbyllja e saj nuk pastron formularin origjinal.

Fontet zgjidhen veçmas në `pdf.js`: `EVIDENCE_PDF_FONT` për evidencën PDF dhe `REPORT_FONT` për raportin HTML. Mund të përdoren `HelveticaNeue` ose `Comfortaa`, me skedarët përkatës në `fonts/`.

## 3. Vazhdoni më vonë

- **Shkarko draftin:** ruan formularin e plotë si JSON.
- **Hap draftin:** rikthen plotësimet nga drafti; drejtuesi merret nga konfigurimi aktual.
- **Formular i ri:** pastron formularin pas konfirmimit.
- **Përmbledhja e ngarkesës mësimore:** hap faqen e grumbullimit të evidencave në skedë të re.

**Përpara mbylljes ose rifreskimit të formularit, shkarkoni draftin.** Formulari nuk ruhet automatikisht.

## 4. Kodi QR

Evidenca PDF dhe raporti përmbajnë një QR me përmbledhjen JSON: pedagogun, lëndën, programin, vitin, semestrin, ciklin, maksimumin e studentëve dhe kreditet, grupet e orët faktike për kategoritë aktive.

**QR-ja nuk përmban draftin e plotë:** nuk ruan temat, regjistrimet ditore ose shënimet. Për rikthimin e formularit përdorni skedarin e shkarkuar nga **Shkarko draftin**.

QR-ja përmban JSON, jo lidhje web. Për ta përfshirë në përmbledhje përdorni skanuesin ose importimin në aplikacion.

## 5. Përmbledhja e ngarkesës mësimore

Faqja `/permbledhje/` grumbullon evidenca përmes kamerës, fotografisë me QR, PDF-ve ose JSON-eve përmbledhëse.

**Mund të zgjidhen disa PDF njëherësh.** Lexohen me radhë dhe evidencat paraqiten te **02 · Kontrollo evidencën**, përpara shtimit në regjistër. Nëse një PDF nuk lexohet, përpunimi vazhdon me të tjerët dhe shfaqet emri i skedarit problematik.

Importimi nga PDF kërkon QR-në; aplikacioni nuk nxjerr të dhënat nga teksti ose tabela e një PDF-je të zakonshme. Drafti JSON i formularit nuk përdoret në këtë faqe.

### Si bashkohen të dhënat

Për çdo kategori mblidhen studentët, grupet dhe orët faktike të evidencave të përzgjedhura.

Studentët merren si maksimumi i regjistruar në secilën evidencë dhe shtohen një herë për çdo kategori aktive. Ky total nuk përfaqëson studentë unikë në të gjitha lëndët. Orët mblidhen drejtpërdrejt, pa u shumëzuar përsëri me grupet.

Shembull: pesë lëndë me nga një grup leksioni kontribuojnë me pesë grupe dhe me shumën e orëve të tyre.

### Identifikimi i evidencave

Identifikimi bazohet te pedagogu, lënda, programi, viti akademik, semestri dhe cikli. Evidencat identike nuk shtohen dy herë. Për një version të ndryshuar me të njëjtin identifikim, përdoruesi konfirmon zëvendësimin.

### Filtrat dhe tabela përmbledhëse

Filtrat përzgjedhin pedagogun, vitin akademik dhe semestrin. Tabela paraqet kategoritë, shumën e orëve në auditor, shumën e orëve mbështetëse dhe totalin.

Zërat 6–10, si udhëheqjet e diplomave dhe angazhimet e doktoraturës, nuk plotësohen automatikisht nga QR-ja aktuale.

### Eksportimi

- **Eksporto të gjitha evidencat:** ruan koleksionin e evidencave si JSON.
- **Eksporto JSON** te një evidencë: ruan vetëm atë evidencë.
- **Eksporto tabelën CSV:** ruan vetëm tabelën 03, sipas filtrave aktualë.

CSV-ja përdor ndarësin `;`. Për përputhshmëri, `ë` dhe `ç` zëvendësohen me `e` dhe `c`, ndërsa vizat tipografike me `-`.

### Shkresa e realizimit të ngarkesës mësimore

Shkresa përdor evidencat dhe tabelën e seksionit **03 · Përmbledhja**.

1. Zgjidhni pedagogun, një vit akademik dhe **Të gjithë semestrat** te pika 03.
2. Te pika 05 zgjidhni statusin PAE/PAK, grupin mësimor dhe normën.
3. Klikoni **Gjenero shkresën** për shkarkimin e drejtpërdrejtë të PDF-së.

Filtri “Të gjithë semestrat” përfshin evidencat e ngarkuara; nuk kontrollon nëse është plotësuar i gjithë viti.

Statusi paraqitet në shkresë si “personel akademik efektiv (PAE)” ose “personel akademik i ftuar (PAK)”. Grupet janë Gjeoinformatikë dhe Gjeologji e Zbatuar. Emri i pedagogut dhe viti merren nga evidencat; drejtuesit nga `referenca.json`.

Lista e normave dhe shënimi i udhëzimit ngarkohen nga `referenca.json`. Konfigurimi aktual është:

| Kategoria / funksioni | Norma (orë) |
| --- | ---: |
| Profesor | 140 |
| Lektor | 165 |
| Asistent-lektor | 195 |
| Drejtues departamenti | 90 |
| Zëvendësdekan | 90 |
| Dekan | 70 |
| Zëvendësrektor | 60 |
| Rektor | 50 |

Kategoria zgjidhet nga përdoruesi; nuk përcaktohet automatikisht nga emri ose titulli i pedagogut.

**Ngarkesa totale = Orët në auditor + Orët mbështetëse**, përfshirë praktikën kur ka të tilla.

**Orët mbi normë = maksimumi ndërmjet 0 dhe (ngarkesës totale − normës së zgjedhur).** Kur norma nuk tejkalohet, shkresa nuk përfshin kërkesën për pagesë të orëve mbi normë.

Skedari emërtohet `Shkresa_EmriPedagogut_VitiAkademik.pdf`. Shkresa përdor një kopje të të dhënave në çastin e gjenerimit dhe nuk ndryshon regjistrin. Nëse ndryshoni evidencat, filtrat ose zgjedhjet, gjenerojeni përsëri.

## 6. Ruajtja e të dhënave dhe kalimi ndërmjet faqeve

Aplikacioni nuk ka llogari përdoruesish ose databazë të përbashkët në server.

| Pjesa | Si ruhen të dhënat |
| --- | --- |
| Formulari | Mbetet i plotësuar sa kohë skeda është e hapur; ruajtja për më vonë bëhet me draft JSON. |
| Raporti | Merr një kopje përmes `localStorage` të përkohshëm, pastaj e mban në `sessionStorage` të skedës së vet për rifreskim dhe printim. Kjo nuk rikthen formularin. |
| Përmbledhja | Evidencat e shtuara ruhen në `localStorage` të shfletuesit dhe zakonisht mbeten pas mbylljes së faqes. |

Të dhënat e përmbledhjes nuk sinkronizohen ndërmjet pajisjeve, mund të fshihen kur pastroni shfletuesin dhe mund të jenë të përkohshme në shfletim privat. Në pajisje të përbashkëta, ato mund të shihen nga përdoruesit e të njëjtit profil.

Përdorni eksportin JSON për kopje rezervë të përmbledhjes. **JSON-i përmbledhës nuk zëvendëson draftin e plotë të formularit.**

## 7. Kamera dhe skanimi

Zona e kamerës është katrore. Mbajeni QR-në të plotë në pamje, me ndriçim të mirë dhe pa reflektime. Nëse nuk lexohet, ngarkoni një foto të qartë ose PDF-në origjinale. Leximi varet nga fokusi, madhësia dhe dendësia e QR-së.

## 8. Publikimi dhe përditësimi

Aplikacioni publikohet përmes GitHub Pages. Versioni i dokumentuar: `2026.11.3l`.

### Konfigurimi në referenca.json

Skedari ndodhet në folderin kryesor, pranë `index.html`, dhe përmban:

- Emrat e drejtuesit të departamentit, dekanit dhe administratorit.
- Koeficientët e ngarkesës për të dy ciklet, shumëzimin me grupet dhe maksimumin e grupeve.
- Listën e normave mësimore dhe referencën e udhëzimit.

Pas ndryshimit të JSON-it dhe publikimit në GitHub Pages, rifreskoni faqen dhe gjeneroni dokumentet përsëri. Raporti merr një kopje të formulave bashkë me të dhënat e formularit. Dokumentet e shkarkuara më parë mbeten të pandryshuara.

Kur ndryshojnë formulat ose normat, përditësoni edhe tabelat shpjeguese në këtë README. Rishikimi i konfigurimit bëhet në përputhje me rregulloret dhe aktet përkatëse.

## 9. Kufizime të rëndësishme

- Lejohen 1–100 regjistrime mësimore për evidencë.
- Evidenca PDF dhe raporti kërkojnë verifikimin e formularit pa gabime.
- Çdo PDF për import duhet të jetë deri në 100 faqe dhe jo më i madh se 30 MB.
- QR-ja është përmbledhje; emërtimet shumë të gjata mund të tejkalojnë kapacitetin e saj.
- Dokumentet mund të zgjaten në disa faqe kur përmbajtja është e gjatë.
- Bibliotekat nga CDN dhe burimet që nuk janë ngarkuar ende kërkojnë lidhje interneti.
- Nuk ka sinkronizim automatik ose arkiv të përbashkët ndërmjet përdoruesve.

## Rrjedha e përdorimit

**Plotëso formularin → Verifiko → Shkarko evidencën / Gjenero raportin → Importo te Përmbledhja → Kontrollo dhe shto evidencën → Eksporto totalet / Shkarko shkresën.**
