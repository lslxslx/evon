// Fonti i evidencës PDF: 'HelveticaNeue' ose 'Comfortaa'.
const EVIDENCE_PDF_FONT = 'HelveticaNeue';

// Fonti i raportit në PDF: 'Comfortaa' ose 'HelveticaNeue'.
const REPORT_FONT = 'Comfortaa';

/* Raport narrativ HTML dhe PDF. (C) ルイス */

// =====================================================
// EMRI I PDF-SË
// =====================================================

function pdfFilename(data) {
  return (
    'Evidence_' + data.subject + '_' + data.teacher
  )
    .replace(/[^\p{L}\p{N}_-]/gu, '_')
    .replace(/_+/g, '_')
    .slice(0, 130)
    .replace(/_+$/, '') + '.pdf';
}

function reportDefinition(data, result) {
  const num = value =>
    Number(String(value || 0).replace(',', '.'));

  const sum = values =>
    Math.round(
      values.reduce(
        (total, value) => total + num(value),
        0
      ) * 1000000
    ) / 1000000;

  const labels = [
    'Leksion',
    'Seminar',
    'Lab.',
    'Det./Proj.',
    'Praktikë'
  ];

  const text = value =>
    String(value == null ? '' : value);

  const cell = (value, extra = {}) => ({
    text: text(value),
    alignment: 'center',
    ...extra
  });

  const head = (value, extra = {}) =>
    cell(value, {
      fillColor: '#eeeeee',
      margin: [0, 3, 0, 3],
      ...extra
    });

  const body = [
    [
      head('', { colSpan: 4 }),
      {},
      {},
      {},
      head('Orë faktike', { colSpan: 5 }),
      {},
      {},
      {},
      {},
      head('')
    ],

    [
      'Java',
      'Data',
      'Nr. Std.',
      'Tema e mësimit',
      ...labels,
      'Shuma / dt.'
    ].map((label, index) =>
      head(label, { bold: index === 9 })
    )
  ];

  data.rows.forEach(row => {
    body.push([
      // Në evidencë ruhet simboli * për zëvendësimet.
      cell(
        text(row.week) +
        (row.replacement ? ' *' : '')
      ),

      cell(
        row.date.split('-').reverse().join('.')
      ),

      cell(row.students),

      {
        text: row.topic
      },

      ...row.hours.map(value =>
        cell(num(value) || '')
      ),

      cell(sum(row.hours), {
        bold: true
      })
    ]);
  });

  const totalIndex = body.length;

  body.push([
    {
      text: 'Shuma totale',
      colSpan: 4,
      bold: true
    },
    {},
    {},
    {},

    ...result.actual.map(value =>
      cell(value, { bold: true })
    ),

    cell(sum(result.actual), {
      bold: true
    })
  ]);

  const pageWidth = 595.28;
  const margin = 31.18;
  const contentWidth = pageWidth - 2 * margin;

  const widths = [
    5, 11, 6, 34, 7, 7, 7, 7, 7, 9
  ].map(percentage =>
    (contentWidth - 40) * percentage / 100
  );

  const plan = [
    [
      head('', { margin: [0, 0, 0, 0] }),
      head('ECTS', { margin: [0, 0, 0, 0] }),
      head('Grupe', { margin: [0, 0, 0, 0] })
    ],

    ...labels.map((label, index) => [
      {
        text: label
      },

      cell(data.credits[index] || 0),

      cell(data.groups[index])
    ]),

    [
      {
        text: 'ECTS tot.',
        bold: true,
        fillColor: '#f2f2f2'
      },

      cell(result.totalCredits, {
        bold: true,
        fillColor: '#f2f2f2'
      }),

      {
        text: '',
        fillColor: '#f2f2f2'
      }
    ]
  ];

  const definition = {
    pageSize: 'A4',
    pageOrientation: 'portrait',

    pageMargins: [
      margin,
      margin,
      margin,
      margin
    ],

    info: {
      title: pdfFilename(data).replace(/\.pdf$/i, ''),
      author: data.teacher
    },

    defaultStyle: {
      font: EVIDENCE_PDF_FONT,
      fontSize: 8,
      color: '#171717',
      lineHeight: 1.15
    },

    content: [
      {
        text: data.university,
        margin: [0, 0, 0, 4]
      },

      {
        text: data.faculty,
        margin: [0, 0, 0, 4]
      },

      {
        text: data.department,
        margin: [0, 0, 0, 4]
      },

      {
        text:
          'EVIDENCË E NGARKESËS MËSIMORE ' +
          data.year,
        fontSize: 11,
        bold: true,
        margin: [0, 16, 0, 10]
      },

      {
        columns: [
          {
            width: '66%',

            stack: [
              {
                text: 'LËNDA: ' + data.subject,
                margin: [0, 0, 0, 5]
              },

              {
                text: 'PROGRAMI: ' + data.program,
                margin: [0, 0, 0, 5]
              },

              {
                text: 'CIKLI: ' + data.cycle,
                margin: [0, 0, 0, 5]
              },

              {
                text:
                  'SEMESTRI: ' +
                  String(data.semester).toUpperCase()
              }
            ]
          },

          {
            width: '34%',
            fontSize: 7.5,

            table: {
              headerRows: 1,
              widths: ['46%', '27%', '27%'],
              body: plan
            },

            layout: {
              hLineWidth: () => 0,
              vLineWidth: () => 0,
              paddingLeft: () => 2,
              paddingRight: () => 2,
              paddingTop: () => 2,
              paddingBottom: () => 2
            }
          }
        ]
      },

      {
        margin: [0, 14, 0, 0],
        fontSize: 7.5,

        table: {
          headerRows: 2,
          keepWithHeaderRows: 1,
          dontBreakRows: true,
          widths,
          body
        },

        layout: {
          hLineWidth: index =>
            index >= 2 ? 0.4 : 0,

          vLineWidth: () => 0,

          hLineColor: index =>
            index === 2 ? '#999999' : '#e3e3e3',

          paddingLeft: () => 2,
          paddingRight: () => 2,
          paddingTop: () => 3,
          paddingBottom: () => 3,

          fillColor: index =>
            index === totalIndex ? '#eeeeee' : null
        }
      },

      ...(result.differences.some(value => Math.abs(value) > 0.000001)
        ? [{
            unbreakable: true,
            margin: [0, 8, 0, 0],
            stack: [
              {
                text: result.differences.some(value => value < -0.000001)
                  ? 'Ngarkesë me diferenca ndaj planit.'
                  : 'Ngarkesë e realizuar pjesërisht.',
                bold: true,
                color: '#943c2d'
              },
              {
                text: 'Detajet e përputhjes së orëve paraqiten në raportin bashkëlidhur.',
                fontSize: 7.5,
                color: '#666666',
                margin: [0, 3, 0, 0]
              }
            ]
          }]
        : []),

      // Deklarata, QR-ja dhe firmat qëndrojnë së bashku.
      {
        unbreakable: true,
        margin: [0, 25, 0, 0],

        stack: [
          {
            text:
              'Deklaroj se të dhënat e paraqitura në këtë evidencë ' +
              'pasqyrojnë ngarkesën mësimore të realizuar prej meje.',
            margin: [0, 0, 0, 25]
          },

          {
            columns: [
              {
                width: '50%',

                stack: [
                  {
                    text: 'DEKLARUES'
                  },

                  {
                    text: data.teacher,
                    margin: [0, 5, 8, 0]
                  }
                ]
              },

              {
                width: '50%',
                alignment: 'right',

                stack: [
                  {
                    text: 'DREJTUES DEPARTAMENTI'
                  },

                  {
                    text: data.head,
                    margin: [0, 5, 0, 0]
                  }
                ]
              }
            ]
          },

          // QR nën deklaruesin dhe drejtuesin e departamentit.
          {
            qr: evidenceQrText(data, result),
            eccLevel: 'M',
            fit: 90,
            padding: 4,
            foreground: '#1a1a1a',
            background: '#ffffff',
            alignment: 'center',
            margin: [0, 20, 0, 0]
          }
        ]
      }
    ]
  };

  // Raporti fillon në faqe të re pas gjithë evidencës.
  definition.content.push({
    pageBreak: 'before',
    font: REPORT_FONT,
    fontSize: 8.5,
    lineHeight: 1.15,
    stack: narrativePdfContent(data, result)
  });
  return definition;
}

// =====================================================
// GJENERIMI I PDF-SË — PDFMAKE 0.2.20
// =====================================================

async function generatePdfBlob(data) {
  if (
    !data ||
    JSON.stringify(data).length > 500000
  ) {
    throw new Error(
      'Formulari mungon ose është shumë i madh.'
    );
  }

  const result = evaluate_(data);

  if (result.dataErrors.length) {
    throw new Error(result.dataErrors.join('\n'));
  }

  if (typeof pdfMake === 'undefined') {
    throw new Error(
      'Gjeneruesi i PDF-së nuk u ngarkua. ' +
      'Kontrolloni vendor/pdfmake.min.js.'
    );
  }

  // Regjistron të dy fontet pa hequr fontet e tjera të aplikacionit.
  const evidenceFonts = {
    ...pdfMake.fonts,
    HelveticaNeue: {
      normal: new URL('fonts/HelveticaNeue-Regular.ttf', document.baseURI).href,
      bold: new URL('fonts/HelveticaNeue-Bold.ttf', document.baseURI).href,
      italics: new URL('fonts/HelveticaNeue-Regular.ttf', document.baseURI).href,
      bolditalics: new URL('fonts/HelveticaNeue-Bold.ttf', document.baseURI).href
    },
    Comfortaa: {
      normal: new URL('fonts/Comfortaa-Regular.ttf', document.baseURI).href,
      bold: new URL('fonts/Comfortaa-Bold.ttf', document.baseURI).href,
      italics: new URL('fonts/Comfortaa-Regular.ttf', document.baseURI).href,
      bolditalics: new URL('fonts/Comfortaa-Bold.ttf', document.baseURI).href
    }
  };

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(
        new Error(
          'Gjenerimi zgjati shumë. ' +
          'Rifreskoni dhe provoni përsëri.'
        )
      );
    }, 60000);

    try {
      pdfMake
        .createPdf(
          reportDefinition(data, result),
          undefined,
          evidenceFonts
        )
        .getBuffer(bytes => {
          clearTimeout(timer);

          resolve(
            new Blob(
              [bytes],
              {
                type: 'application/pdf'
              }
            )
          );
        });
    } catch (error) {
      clearTimeout(timer);
      reject(error);
    }
  });
}

// =====================================================
// QR — TË DHËNAT PËRMBLEDHËSE TË EVIDENCËS
// =====================================================

function evidenceQrData(data, result) {
  const number = value =>
    Number(
      String(value ?? 0).trim().replace(',', '.')
    );

  const round = value =>
    Math.round(value * 1000000) / 1000000;

  const cleanText = value =>
    String(value ?? '').trim().normalize('NFC');

  // Maksimumi merret një herë nga e gjithë evidenca.
  const students = Math.max(
    0,
    ...data.rows.map(row => number(row.students))
  );

  const categoryCodes = [
    'leksione',
    'seminare',
    'laboratore',
    'detyra',
    'praktika'
  ];

  const categories = [];

  categoryCodes.forEach((code, index) => {
    const credits = number(data.credits[index]);

    // Kategoritë me zero kredite nuk përfshihen.
    if (!(credits > 0)) return;

    categories.push({
      code,
      credits: round(credits),
      students,
      groups: number(data.groups[index]),

      // Orët faktike nuk shumëzohen përsëri me grupet.
      hours: round(result.actual[index])
    });
  });

  return {
    type: 'evon-summary',
    version: 1,

    teacher: cleanText(data.teacher),
    subject: cleanText(data.subject),
    program: cleanText(data.program),

    year: cleanText(data.year),
    semester: cleanText(data.semester).toUpperCase(),
    cycle: number(data.cycle),

    students,
    categories
  };
}

// =====================================================
// QR — SERIALIZIMI NË JSON
// =====================================================

function evidenceQrText(data, result) {
  const summary = evidenceQrData(data, result);

  /*
    Përdorim karaktere ASCII brenda QR-së.
    Shkronjat shqipe rikthehen nga JSON.parse().
  */
  const serialized = JSON.stringify(summary).replace(
    /[\u007f-\uffff]/g,
    character =>
      '\\u' +
      character
        .charCodeAt(0)
        .toString(16)
        .padStart(4, '0')
  );

  // Nuk shkurtojmë ose humbasim të dhëna.
  if (serialized.length > 2200) {
    throw new Error(
      'Përmbledhja është tepër e gjatë për QR-në. ' +
      'Shkurtoni emërtimet e gjata të lëndës, programit ' +
      'ose pedagogut dhe provoni përsëri.'
    );
  }

  return serialized;
}


/* Raporti narrativ bashkëlidhur evidencës; pa QR të dytë. */
function narrativePdfContent(data, result) {
  const number = value => Number(String(value || 0).replace(',', '.'));
  const round = value => Math.round(value * 1e6) / 1e6;
  const sum = values => round(values.reduce((a, b) => a + number(b), 0));
  const fmt = value => String(round(number(value))).replace('.', ',');
  const date = value => value.split('-').reverse().join('.');
  const bold = value => ({ text: String(value), bold: true });
  const paragraph = text => ({ text, margin: [0, 0, 0, 6] });
  const heading = text => ({ text, bold: true, fontSize: 9, margin: [0, 10, 0, 6] });
  const difference = value => Math.abs(value) <= 0.000001 ? '' : {
    text: value > 0
      ? ' Mungojnë ' + fmt(value) + ' orë.'
      : ' Janë tejkaluar ' + fmt(-value) + ' orë.',
    bold: true,
    color: '#943c2d'
  };
  const names = ['Leksionet', 'Seminaret', 'Laboratorët', 'Detyrat/projektet', 'Praktika'];
  const sorted = [...data.rows].sort((a, b) => a.date.localeCompare(b.date));
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  const weeks = new Set(data.rows.map(row => number(row.week))).size;
  const content = [
    { text: 'RAPORT I NGARKESËS MËSIMORE ' + data.year,
      fontSize: 11, bold: true, margin: [0, 0, 0, 10] },
    heading('Përmbledhje e zhvillimit të lëndës'),
    first ? paragraph([
      'Lënda ', bold(data.subject), ' është zhvilluar në ',
      bold(weeks + ' javë regjistrime mësimore'), ', nga java ',
      bold(first.week), ' më ', bold(date(first.date)), ' deri në javën ',
      bold(last.week), ' më ', bold(date(last.date)), '.'
    ]) : paragraph('Nuk ka regjistrime mësimore.'),
    heading('Ngarkesa mësimore e realizuar')
  ];
  names.forEach((label, i) => {
    if (number(data.credits[i]) <= 0) return;
    content.push(paragraph([
      bold(label + ':'), ' janë realizuar ', bold(fmt(result.actual[i]) + ' orë'),
      ' nga ', bold(fmt(result.expected[i]) + ' orë'),
      ' të përcaktuara sipas krediteve dhe grupeve.', difference(result.differences[i])
    ]));
  });
  content.push(paragraph([
    'Në total janë realizuar ', bold(fmt(sum(result.actual)) + ' orë'),
    ' nga ', bold(fmt(sum(result.expected)) + ' orë'),
    ' të përcaktuara sipas krediteve dhe grupeve.', difference(sum(result.differences))
  ]));
  if (Math.abs(sum(result.differences)) <= 0.000001 &&
      result.differences.some(value => Math.abs(value) > 0.000001)) {
    content.push(paragraph('Totali përputhet, por ka diferenca ndërmjet kategorive.'));
  }
  content.push(heading('Datat me më shumë se 8 orë mësimore / ditë'));
  const byDate = new Map();
  data.rows.forEach(row => {
    const hours = byDate.get(row.date) || [0, 0, 0, 0, 0];
    row.hours.forEach((value, i) => { hours[i] = round(hours[i] + number(value)); });
    byDate.set(row.date, hours);
  });
  const dailyNames = ['leksion', 'seminar', 'laborator', 'detyrë/projekt', 'praktikë'];
  const overEight = [...byDate].sort(([a], [b]) => a.localeCompare(b))
    .filter(([, hours]) => sum(hours) > 8);
  overEight.forEach(([day, hours]) => {
    const parts = hours.map((value, i) => value > 0 ? fmt(value) + ' orë ' + dailyNames[i] : '').filter(Boolean);
    const detail = parts.length > 1 ? parts.slice(0, -1).join(', ') + ' dhe ' + parts[parts.length - 1] : parts[0];
    content.push({ ...paragraph([
      'Në datën ', bold(date(day)), ' janë zhvilluar ' + detail + ', me një total prej ',
      bold(fmt(sum(hours)) + ' orësh'), '.'
    ]), color: '#943c2d' });
  });
  if (!overEight.length) content.push(paragraph('Nuk ka data me më shumë se 8 orë mësimore / ditë të regjistruara.'));
  content.push(heading('Shënime dhe referenca për zëvendësimet'));
  const replacements = [...new Set(data.rows.filter(row => row.replacement).map(row => row.date))].sort();
  content.push(paragraph(replacements.length ? [
    replacements.length === 1 ? 'Në datën ' : 'Në datat ',
    bold(replacements.map(date).join(', ')),
    replacements.length === 1 ? ' është bërë zëvendësim.' : ' janë bërë zëvendësime.'
  ] : 'Nuk janë bërë zëvendësime.'));
  const notes = String(data.notes || '').trim().replace(/^\*+\s*/, '');
  if (notes) content.push(paragraph([bold('Shënime: '), notes]));
  content.push({ unbreakable: true, margin: [0, 18, 0, 0], stack: [
    paragraph('Deklaroj se të dhënat e paraqitura në këtë raport pasqyrojnë ngarkesën mësimore të realizuar prej meje.'),
    { text: 'DEKLARUES', margin: [0, 18, 0, 0] },
    { text: data.teacher, margin: [0, 6, 0, 0] }
  ] });
  return content;
}
