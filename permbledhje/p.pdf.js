'use strict';

function letterPdfName(d) {
  return (
    'Shkresa_' + d.teacher + '_' + d.year
  )
    .replace(/[^\p{L}\p{N}_-]/gu, '_')
    .replace(/_+/g, '_') + '.pdf';
}

/* Leximi i emrave nga referenca.json. */
async function loadLetterReferences() {
  const response = await fetch('../referenca.json', {
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(
      'Nuk u ngarkua referenca.json. ' +
      'Kontrolloni që skedari ndodhet në folderin e përmbledhjes.'
    );
  }

  let references;

  try {
    references = await response.json();
  } catch {
    throw new Error(
      'Skedari referenca.json nuk ka format të vlefshëm JSON.'
    );
  }

  const required = {
    administratori: 'Administratori',
    dekani: 'Dekani',
    drejtuesiDepartamentit: 'Drejtuesi i departamentit'
  };

  if (
    !references ||
    typeof references !== 'object' ||
    Array.isArray(references)
  ) {
    throw new Error(
      'Përmbajtja e referenca.json duhet të jetë një objekt JSON.'
    );
  }

  const result = {};

  for (const [key, label] of Object.entries(required)) {
    if (
      typeof references[key] !== 'string' ||
      !references[key].trim()
    ) {
      throw new Error(
        'Në referenca.json mungon emri për: ' + label + '.'
      );
    }

    result[key] = references[key].trim();
  }

  return result;
}

/* Përmbajtja dhe formatimi i PDF-së. */
function letterPdfDefinition(d, images, references) {
  const b = value => ({
    text: String(value),
    bold: true
  });

  const excess = Math.max(
    0,
    Math.round((d.total - d.norm) * 1e6) / 1e6
  );

  return {
    pageSize: 'A4',
    pageMargins: [43, 36, 43, 36],

    info: {
      title: letterPdfName(d).replace(/\.pdf$/, ''),
      author: d.teacher
    },

    defaultStyle: {
      font: 'HelveticaNeue',
      fontSize: 11,
      lineHeight: 1.15
    },

    images,

    content: [
      // Koka sipas modelit Word. Njësia e matjes: pt.
      // Stema rezervon hapësirën e kokës.
      {
        image: 'coat',
        width: 24.35,
        height: 34,
        alignment: 'center',
        margin: [0, 0.7, 0, 89.3]
      },

      {
        image: 'upt',
        width: 36.25,
        height: 40.54,
        absolutePosition: {
          x: 46.5,
          y: 85
        }
      },

      {
        image: 'fgjm',
        width: 37.45,
        height: 36.85,
        absolutePosition: {
          x: 85.1,
          y: 85
        }
      },

      {
        image: 'department',
        width: 76.55,
        height: 76.55,
        absolutePosition: {
          x: 469,
          y: 60.95
        }
      },

      {
        text: 'REPUBLIKA E SHQIPËRISË',
        fontSize: 9,
        lineHeight: 1,
        alignment: 'center',
        width: 509.28,
        absolutePosition: {
          x: 43,
          y: 75.7
        }
      },

      {
        text: 'UNIVERSITETI POLITEKNIK I TIRANËS',
        fontSize: 9,
        lineHeight: 1,
        alignment: 'center',
        width: 509.28,
        absolutePosition: {
          x: 43,
          y: 92.1
        }
      },

      {
        text: 'FAKULTETI I GJEOLOGJISË DHE I MINIERAVE',
        fontSize: 9,
        lineHeight: 1,
        alignment: 'center',
        width: 509.28,
        absolutePosition: {
          x: 43,
          y: 105.35
        }
      },

      {
        text:
          'DEPARTAMENTI I GJEOLOGJISË SË ZBATUAR ' +
          'DHE GJEOINFORMATIKËS',
        fontSize: 9,
        lineHeight: 1,
        alignment: 'center',
        width: 509.28,
        absolutePosition: {
          x: 43,
          y: 118.6
        }
      },

      {
        columns: [
          {
            text: 'Nr. _____ Prot.'
          },
          {
            text: 'Tiranë, më ____.____.________',
            alignment: 'right'
          }
        ],
        margin: [0, 0, 0, 22]
      },

      {
        text: [
          b('Lënda: '),
          'Realizimi i ngarkesës mësimore për vitin akademik ' +
            d.year
        ],
        margin: [0, 22, 0, 10]
      },

      {
        text:
          'ADMINISTRATORIT TË FAKULTETIT TË GJEOLOGJISË ' +
          'DHE MINIERAVE\n' +
          references.administratori,
        bold: true,
        alignment: 'center',
        margin: [0, 10, 0, 22]
      },

      {
        text: [
          b(d.teacher),
          ' ka dhënë mësim si ',
          b(d.status),
          ', pranë grupit mësimor të ',
          b(d.group),
          ' gjatë vitit akademik ',
          b(d.year),
          ' dhe ka realizuar ngarkesën mësimore në mbështetje ' +
            'të procesit mësimor, si më poshtë:'
        ],
        alignment: 'justify',
        margin: [0, 0, 0, 10]
      },

      {
        fontSize: 9,

        table: {
          headerRows: 1,
          dontBreakRows: true,
          widths: [22, '*', 80, 75, 45],

          body: d.rows.map((row, rowIndex) =>
            row.cells.map((value, columnIndex) => ({
              text: value,
              alignment: columnIndex === 1 ? 'left' : 'center',
              bold: rowIndex === 0 || row.total,
              fillColor:
                rowIndex === 0
                  ? '#f0f0f0'
                  : row.total
                    ? '#f4f4f4'
                    : null
            }))
          )
        },

        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5,
          hLineColor: () => '#cdcdcd',
          vLineColor: () => '#cdcdcd',
          paddingLeft: () => 4,
          paddingRight: () => 4,
          paddingTop: () => 4,
          paddingBottom: () => 4
        },

        margin: [0, 0, 0, 10]
      },

      {
        text: [
          'Ngarkesa e realizuar si veprimtari në auditor ' +
            'në mbështetje të procesit mësimor është ',
          b(d.total),
          ' orë.'
        ],
        margin: [0, 0, 0, 10]
      },

      {
        text:
          excess > 0
            ? [
                'Për ngarkesën e realizuar ',
                b(excess),
                ' orë, mbi normën ',
                b(d.norm),
                ' orë, të bëhet pagesa sipas Udhëzimit ' +
                  'nr. 29 dt. 10.09.2018.'
              ]
            : [
                'Ngarkesa e realizuar nuk e tejkalon normën prej ',
                b(d.norm),
                ' orësh. Nuk ka ngarkesë mbi normë.'
              ],

        alignment: 'justify'
      },

      {
        unbreakable: true,
        margin: [0, 20, 0, 0],

        columns: [
          {
            width: 'auto',
            alignment: 'left',

            stack: [
              {
                text: 'DREJTUES DEPARTAMENTI'
              },
              {
                text: references.drejtuesiDepartamentit,
                margin: [0, 8, 0, 0]
              }
            ]
          },

          {
            width: '*',
            text: ''
          },

          {
            width: 'auto',
            alignment: 'center',

            stack: [
              {
                text: 'DEKANI'
              },
              {
                text: references.dekani,
                margin: [0, 8, 0, 0]
              }
            ]
          }
        ]
      }
    ]
  };
}

/* Gjenerimi dhe shkarkimi i PDF-së. */
async function downloadWorkloadLetter(data) {
  if (typeof pdfMake === 'undefined') {
    throw new Error(
      'Biblioteka pdfmake nuk u ngarkua.'
    );
  }

  // Emrat lexohen përsëri në çdo gjenerim.
  const references = await loadLetterReferences();

  const paths = {
    coat: 'images/stema.jpg',
    upt: 'images/upt.png',
    fgjm: 'images/fgjm.jpg',
    department: 'images/d_logo.png'
  };

  const images = Object.fromEntries(
    await Promise.all(
      Object.entries(paths).map(async ([key, path]) => {
        const response = await fetch(path);

        if (!response.ok) {
          throw new Error('Nuk u ngarkua ' + path);
        }

        const blob = await response.blob();

        const value = await new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = () => resolve(reader.result);

          reader.onerror = () => {
            reject(new Error('Nuk u lexua ' + path));
          };

          reader.readAsDataURL(blob);
        });

        return [key, value];
      })
    )
  );

  const regularFont = new URL(
    '../fonts/HelveticaNeue-Regular.ttf',
    location.href
  ).href;

  const boldFont = new URL(
    '../fonts/HelveticaNeue-Bold.ttf',
    location.href
  ).href;

  pdfMake.fonts = {
    HelveticaNeue: {
      normal: regularFont,
      bold: boldFont,
      italics: regularFont,
      bolditalics: boldFont
    }
  };

  const blob = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(
        new Error(
          'PDF-ja nuk u gjenerua. ' +
          'Kontrolloni ngarkimin e fonteve.'
        )
      );
    }, 60000);

    try {
      pdfMake
        .createPdf(
          letterPdfDefinition(data, images, references)
        )
        .getBuffer(bytes => {
          clearTimeout(timer);

          resolve(
            new Blob([bytes], {
              type: 'application/pdf'
            })
          );
        });
    } catch (error) {
      clearTimeout(timer);
      reject(error);
    }
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = letterPdfName(data);

  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 60000);
}
