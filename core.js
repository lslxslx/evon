/* Konfigurimi i ngarkesës nga referenca.json. */
const workloadCategories = [
  'leksion',
  'seminar',
  'laborator',
  'detyreProjekt',
  'praktike'
];

let workloadConfiguration = null;

function validateWorkloadConfiguration(config) {
  if (
    !config ||
    !config.koeficientet ||
    !config.shumezoMeGrupet
  ) {
    throw new Error(
      'Konfigurimi ngarkesa në referenca.json është i pavlefshëm.'
    );
  }

  for (const cycle of ['1', '2']) {
    for (const key of workloadCategories) {
      const rate = config.koeficientet[cycle]?.[key];

      if (
        typeof rate !== 'number' ||
        !Number.isFinite(rate) ||
        rate < 0 ||
        typeof config.shumezoMeGrupet[key] !== 'boolean'
      ) {
        throw new Error(
          'Konfigurim i pavlefshëm për ' +
          key +
          ', cikli ' +
          cycle +
          '.'
        );
      }
    }
  }

  return config;
}

function configureWorkload(config) {
  validateWorkloadConfiguration(config);

  workloadConfiguration = JSON.parse(
    JSON.stringify(config)
  );
}

function getWorkloadConfiguration() {
  return workloadConfiguration
    ? JSON.parse(JSON.stringify(workloadConfiguration))
    : null;
}

/* Formulat dhe verifikimet; ekzekutohen në shfletues. */
function evaluate_(data) {
  const names = [
    'Leksion',
    'Seminar',
    'Laborator',
    'Detyrë/projekt',
    'Praktikë'
  ];

  const errors = [];
  const actual = [0, 0, 0, 0, 0];

  let config = null;

  try {
    config = validateWorkloadConfiguration(
      data?.ngarkesa || workloadConfiguration
    );
  } catch (error) {
    errors.push(
      'Formulat nuk janë ngarkuar ose janë të pavlefshme. ' +
      error.message
    );
  }

  const number = value => {
    if (value === '' || value == null) {
      return 0;
    }

    if (
      typeof value !== 'number' &&
      typeof value !== 'string'
    ) {
      return NaN;
    }

    return Number(
      String(value).trim().replace(',', '.')
    );
  };

  const round = value =>
    Math.round(value * 1000000) / 1000000;

  const day = value => {
    if (
      typeof value !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}$/.test(value)
    ) {
      return NaN;
    }

    const timestamp = Date.parse(
      value + 'T00:00:00Z'
    );

    return (
      Number.isFinite(timestamp) &&
      new Date(timestamp).toISOString().slice(0, 10) === value
    )
      ? timestamp
      : NaN;
  };

  /* Struktura e të dhënave. */
  if (
    !data ||
    typeof data !== 'object' ||
    !Array.isArray(data.rows) ||
    !Array.isArray(data.credits) ||
    !Array.isArray(data.groups)
  ) {
    throw new Error('Të dhëna të pavlefshme.');
  }

  if (
    data.credits.length !== 5 ||
    data.groups.length !== 5
  ) {
    throw new Error(
      'Tabela duhet të përmbajë 5 kategori kreditesh dhe grupesh.'
    );
  }

  /* Fushat e detyrueshme. */
  const required = {
    university: 'Universiteti',
    faculty: 'Fakulteti',
    department: 'Departamenti',
    teacher: 'Pedagog/e',
    head: 'Drejtuesi i departamentit',
    year: 'Viti akademik',
    semester: 'Semestri',
    subject: 'Lënda',
    program: 'Programi i studimit'
  };

  Object.keys(required).forEach(key => {
    if (
      typeof data[key] !== 'string' ||
      !data[key].trim() ||
      data[key].length > 300
    ) {
      errors.push(
        'Plotësoni: ' + required[key]
      );
    }
  });

  /* Cikli. */
  const cycle = number(data.cycle);

  if (![1, 2].includes(cycle)) {
    errors.push('Zgjidhni ciklin 1 ose 2.');
  }

  /* Viti akademik. */
  const yearMatch = (
    typeof data.year === 'string'
      ? data.year.trim()
      : ''
  ).match(/^(\d{4})\s*-\s*(\d{4})$/);

  if (
    !yearMatch ||
    Number(yearMatch[2]) !== Number(yearMatch[1]) + 1
  ) {
    errors.push(
      'Viti akademik duhet të jetë p.sh. 2026-2027.'
    );
  }

  /* Data e fillimit të semestrit. */
  const semesterStart = day(data.start);

  if (!Number.isFinite(semesterStart)) {
    errors.push(
      'Vendosni datën e fillimit të semestrit.'
    );
  }

  /* Kreditet dhe grupet. */
  const credits = data.credits.map(number);
  const groups = data.groups.map(number);

  credits.forEach((value, index) => {
    if (
      !Number.isFinite(value) ||
      value < 0 ||
      value > 60
    ) {
      errors.push(
        'Kredite të pavlefshme për ' +
        names[index] +
        '. Vendosni një vlerë nga 0 deri në 60.'
      );
    }
  });

  /*
    Grupet plotësohen sipas ndarjes së miratuar.
    Nuk zbatohet kufiri i mëparshëm prej 6 grupesh.
  */
  groups.forEach((value, index) => {
    if (
      !Number.isInteger(value) ||
      value < 0 ||
      (credits[index] > 0 && value < 1)
    ) {
      errors.push(
        'Numër grupesh i pavlefshëm për ' +
        names[index] +
        '. Vendosni një numër të plotë jo negativ; ' +
        'kur ka kredite, duhet të jetë të paktën 1.'
      );
    }
  });

  /* Orët e parashikuara sipas konfigurimit. */
  const rates = config && [1, 2].includes(cycle)
    ? workloadCategories.map(
        key => config.koeficientet[String(cycle)][key]
      )
    : [0, 0, 0, 0, 0];

  const expected = credits.map((value, index) =>
    round(
      value *
      rates[index] *
      (
        config?.shumezoMeGrupet[workloadCategories[index]]
          ? groups[index]
          : 1
      )
    )
  );

  const totalCredits = round(
    credits.reduce(
      (total, value) => total + value,
      0
    )
  );

  if (!(totalCredits > 0)) {
    errors.push(
      'Plotësoni të paktën një kredit.'
    );
  }

  /* Numri i regjistrimeve. */
  if (
    data.rows.length < 1 ||
    data.rows.length > 100
  ) {
    errors.push(
      'Lejohen 1 deri në 100 regjistrime.'
    );
  }

  /* Kontrolli dhe mbledhja e orëve faktike. */
  data.rows.forEach((row, index) => {
    const prefix = 'Rreshti ' + (index + 1) + ': ';

    if (!row || typeof row !== 'object') {
      errors.push(
        prefix + 'regjistrim i pavlefshëm.'
      );
      return;
    }

    const lessonDate = day(row.date);

    if (
      Number.isFinite(lessonDate) &&
      new Date(lessonDate).getUTCDay() === 0
    ) {
      errors.push(
        prefix +
        'data ' +
        row.date.split('-').reverse().join('.') +
        ' bie të dielën. Zgjidhni një datë tjetër.'
      );
    }

    if (!Number.isFinite(lessonDate)) {
      errors.push(
        prefix + 'data është e pavlefshme.'
      );
    }

    if (
      Number.isFinite(lessonDate) &&
      Number.isFinite(semesterStart) &&
      lessonDate < semesterStart
    ) {
      errors.push(
        prefix + 'data është para fillimit të semestrit.'
      );
    }

    const week = number(row.week);

    if (
      !Number.isInteger(week) ||
      week < 1 ||
      week > 60
    ) {
      errors.push(
        prefix + 'java duhet të jetë nga 1 deri në 60.'
      );
    }

    const students = number(row.students);

    if (
      row.students == null ||
      String(row.students).trim() === '' ||
      !Number.isInteger(students) ||
      students < 0 ||
      students > 10000
    ) {
      errors.push(
        prefix + 'numri i studentëve është i pavlefshëm.'
      );
    }

    if (
      typeof row.topic !== 'string' ||
      !row.topic.trim() ||
      row.topic.length > 1000
    ) {
      errors.push(
        prefix + 'plotësoni temën (deri në 1000 karaktere).'
      );
    }

    if (
      !Array.isArray(row.hours) ||
      row.hours.length !== 5
    ) {
      errors.push(
        prefix + 'duhen 5 kategori orësh.'
      );
      return;
    }

    const hours = row.hours.map(number);

    hours.forEach((value, category) => {
      if (
        !Number.isFinite(value) ||
        value < 0 ||
        value > 100
      ) {
        errors.push(
          prefix +
          'orë të pavlefshme për ' +
          names[category] +
          '.'
        );
      } else {
        actual[category] = round(
          actual[category] + value
        );
      }
    });

    if (
      hours.every(
        value =>
          Number.isFinite(value) &&
          value >= 0 &&
          value <= 100
      ) &&
      hours.reduce((a, b) => a + b, 0) <= 0
    ) {
      errors.push(
        prefix +
        'vendosni të paktën një vlerë pozitive të orëve.'
      );
    }

    if (
      credits[4] === 0 &&
      Number.isFinite(hours[4]) &&
      hours[4] > 0
    ) {
      errors.push(
        prefix +
        'ka orë praktike, por kreditet e praktikës janë zero.'
      );
    }
  });

  /* Shënimet. */
  if (
    typeof data.notes !== 'string' ||
    data.notes.length > 3000
  ) {
    errors.push(
      'Shënimet duhet të jenë deri në 3000 karaktere.'
    );
  }

  /* Diferencat ndërmjet orëve të parashikuara dhe faktike. */
  const differences = expected.map((value, index) =>
    round(value - actual[index])
  );

  differences.forEach((value, index) => {
    if (
      Number.isFinite(value) &&
      Math.abs(value) > 0.000001
    ) {
      errors.push(
        names[index] +
        ': ' +
        actual[index] +
        ' nga ' +
        expected[index] +
        ' orë; ' +
        (
          value > 0
            ? 'mungojnë ' + value
            : 'janë tejkaluar ' + (-value)
        ) +
        '.'
      );
    }
  });

  return {
    errors: [...new Set(errors)],
    actual,
    expected,
    differences,
    totalCredits
  };
}

/* Java automatike sipas intervaleve 7-ditore. */
function week_(date, start) {
  const parseDay = value => {
    if (
      typeof value !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}$/.test(value)
    ) {
      return NaN;
    }

    const timestamp = Date.parse(
      value + 'T00:00:00Z'
    );

    return (
      Number.isFinite(timestamp) &&
      new Date(timestamp).toISOString().slice(0, 10) === value
    )
      ? timestamp
      : NaN;
  };

  const lessonDate = parseDay(date);
  const semesterStart = parseDay(start);

  if (
    !Number.isFinite(lessonDate) ||
    !Number.isFinite(semesterStart) ||
    lessonDate < semesterStart
  ) {
    return '';
  }

  return Math.floor(
    (lessonDate - semesterStart) / 604800000
  ) + 1;
}
