---
layout: default
permalink: /readme/
---

# Evidencat dhe përmbledhja e ngarkesës mësimore `online`

Aplikacion për plotësimin e evidencave, kontrollin e orëve dhe gjenerimin e dokumenteve. Përdoret në shfletues, pa llogari përdoruesi.

[**Hap aplikacionin**](https://lslxslx.github.io/evon/)

## 1. Si përdoret formulari

### 01 · Të dhënat e evidencës

Plotësoni emrin e pedagogut, lëndën, programin, vitin akademik, ciklin, semestrin dhe datën e fillimit të tij.

Drejtuesi i departamentit plotësohet automatikisht nga `referenca.json`.

### 02 · Kreditet dhe ngarkesa

Vendosni kreditet dhe grupet për çdo kategori. Aktualisht lejohen deri në 6 grupe. Kur ka kredite, kërkohet të paktën një grup.

Orët llogariten sipas tabelës:

| Kategoria | Cikli I | Cikli II |
| --- | --- | --- |
| Leksione | Kredite × 12 × grupe | Kredite × 10 × grupe |
| Seminare | Kredite × 14 × grupe | Kredite × 12 × grupe |
| Laboratorë | Kredite × 20 × grupe | Kredite × 20 × grupe |
| Detyra/projekte | Kredite × 5 | Kredite × 5 |
| Praktikë | Kredite × 20 | Kredite × 20 |

Totali ECTS është shuma e krediteve, pa shumëzim me grupet.

### 03 · Regjistrimet e mësimit

Për çdo datë plotësoni studentët, temën dhe orët e zhvilluara.

- Java llogaritet nga fillimi i semestrit. Mund ta korrigjoni; fshirja e vlerës rikthen llogaritjen automatike.
- Datat që bien të dielën nuk lejohen. Festat zyrtare nuk kontrollohen.
- Laboratori dhe praktika shfaqen kur kanë kredite.
- Për zëvendësimet, shënoni kutinë përkatëse dhe shtoni sqarime në fushën e shënimeve, nëse nevojiten.

### 04 · Verifikimi dhe dokumentet

Klikoni **Verifiko**. Orët faktike duhet të përputhen me orët e parashikuara për çdo kategori.

Korrigjoni gabimet e shfaqura përpara se të gjeneroni dokumentet.

## 2. Dokumentet që gjenerohen

### PDF / Print — Evidenca tabelore

Shkarkon PDF-në me të dhënat e lëndës, tabelën e mësimit, totalet, deklaratën, emrat për firmosje dhe QR-në.

Datat shfaqen si `dd.MM.yyyy`. Zëvendësimet shënohen me `*`; shënimet e plota dalin vetëm në raport.

Emri i skedarit: `Evidence_EmriLendes_EmriPedagogut.pdf`.

### Gjenero raport — Raporti narrativ

Hap një skedë të re me javët, datat dhe orët e realizuara. Datat me më shumë se 8 orë theksohen me të kuqe. Kategoritë me zero kredite nuk përshkruhen.

Raporti tregon datat e zëvendësimeve dhe shënimet, kur ka. Nëse nuk është shënuar asnjë zëvendësim, shfaqet “Nuk janë bërë zëvendësime.”

Për printim përdorni **⌘P** në Mac, **Ctrl+P** në Windows ose **Share / Ndaj → Print** në iPhone/iPad. Mbyllja e raportit nuk pastron formularin.

## 3. Vazhdoni më vonë

- **Shkarko draftin:** ruan formularin e plotë si JSON.
- **Hap draftin:** rikthen të dhënat për të vazhduar plotësimin.
- **Formular i ri:** pastron formularin pas konfirmimit.
- **Përmbledhja e ngarkesës mësimore:** hap faqen e përmbledhjes në një skedë të re.

**Ruani draftin përpara mbylljes ose rifreskimit. Formulari nuk ruhet automatikisht.**

## 4. Kodi QR

QR-ja në evidencë dhe raport përmban të dhënat përmbledhëse të lëndës, studentëve, grupeve dhe orëve.

**QR-ja nuk ruan formularin e plotë.** Për të rikthyer temat, datat dhe regjistrimet përdorni draftin JSON.

## 5. Përmbledhja e ngarkesës mësimore

Ngarkoni evidencat me kamerë, foto QR, PDF ose JSON përmbledhës.

Mund të zgjidhni **disa PDF njëherësh**. Lexohen me radhë dhe paraqiten te **02 · Kontrollo evidencën**. Kontrollojini dhe klikoni **Shto në përmbledhje**. Nëse një PDF nuk lexohet, aplikacioni vazhdon me të tjerët.

PDF-të duhet të përmbajnë QR-në e aplikacionit. Drafti JSON i formularit nuk përdoret në këtë faqe.

### Si mblidhen të dhënat

Për çdo kategori mblidhen studentët, grupet dhe orët e evidencave të përzgjedhura.

Studentët merren si maksimumi i regjistruar në secilën evidencë. Numërohen një herë për çdo kategori aktive të saj; totali nuk është numër studentësh unikë në të gjitha lëndët. Orët nuk shumëzohen përsëri me grupet.

Evidencat identike nuk shtohen dy herë. Për një version të ndryshuar, mund të konfirmoni zëvendësimin.

### Filtrat dhe eksportimi

Filtroni sipas pedagogut, vitit dhe semestrit. Zërat 6–10 nuk plotësohen nga evidenca aktuale.

- **Eksporto të gjitha evidencat:** ruan regjistrin si JSON.
- **Eksporto JSON** te një evidencë: ruan vetëm atë evidencë.
- **Eksporto tabelën CSV:** ruan tabelën 03 sipas filtrave aktualë.

Në CSV, `ë` dhe `ç` kthehen në `e` dhe `c` për të shmangur problemet e shfaqjes në Excel.

### Shkresa e realizimit të ngarkesës mësimore

1. Te pika 03 zgjidhni pedagogun, një vit akademik dhe **Të gjithë semestrat**.
2. Te pika 05 zgjidhni statusin PAE/PAK, grupin mësimor dhe normën.
3. Klikoni **Gjenero shkresën** për të shkarkuar PDF-në.

Shkresa përdor evidencat e ngarkuara. Kontrolloni vetë që të jenë përfshirë të gjitha evidencat e vitit.

Normat aktuale janë:

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

**Totali = Orët në auditor + Orët mbështetëse**, përfshirë praktikën.

**Orët mbi normë = Totali − Norma.** Nëse rezultati është negativ, merret zero dhe nuk përfshihet kërkesë për pagesë të orëve mbi normë.

Emri i skedarit: `Shkresa_EmriPedagogut_VitiAkademik.pdf`. Pas ndryshimit të të dhënave, gjenerojeni përsëri.

## 6. Ruajtja e të dhënave

- **Formulari:** ruhet për më vonë vetëm kur shkarkoni draftin.
- **Raporti:** mban një kopje të të dhënave në skedën e vet; nuk rikthen formularin.
- **Përmbledhja:** ruhet në shfletuesin e pajisjes. Nuk transferohet automatikisht në pajisje të tjera dhe mund të humbasë kur pastroni shfletuesin.

Përdorni **Eksporto të gjitha evidencat** për kopje rezervë. JSON-i i përmbledhjes dhe drafti i formularit janë skedarë me përdorime të ndryshme.

## 7. Kamera dhe skanimi

Mbajeni QR-në të plotë në pamje, me ndriçim të mirë dhe pa reflektime. Nëse kamera nuk e lexon, ngarkoni foton ose PDF-në origjinale.

## 8. Publikimi dhe përditësimi

Aplikacioni publikohet me GitHub Pages. Versioni i dokumentuar: `2026.11.3l`.

Skedari **`referenca.json`**, në folderin kryesor, përmban emrat e drejtuesve, formulat e orëve, maksimumin e grupeve dhe normat mësimore.

Për t’i ndryshuar, përditësoni JSON-in, publikoni ndryshimet dhe rifreskoni faqen. PDF-të e shkarkuara më parë nuk ndryshojnë. Nëse ndryshojnë formulat ose normat, përditësoni edhe tabelat në këtë README.

Fontet e evidencës dhe raportit zgjidhen në `pdf.js`, përmes `EVIDENCE_PDF_FONT` dhe `REPORT_FONT`. Skedarët e fonteve ruhen te `fonts/`.

## 9. Kufizime të rëndësishme

- Lejohen 1–100 regjistrime për evidencë.
- PDF-të për import lejohen deri në 100 faqe dhe 30 MB secili.
- Emërtimet shumë të gjata mund të tejkalojnë kapacitetin e QR-së.
- Dokumentet me shumë përmbajtje mund të dalin në disa faqe.
- Nuk ka arkiv të përbashkët ose sinkronizim ndërmjet përdoruesve.

## Rrjedha e përdorimit

**Plotëso → Verifiko → Gjenero dokumentin → Importo në përmbledhje → Kontrollo dhe shto → Eksporto / Gjenero shkresën.**
