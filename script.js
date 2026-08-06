const menuButton = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const scenarios = {
  violation: {
    origin: 120,
    horizon: 30,
    ruptureTime: 154,
    certificate: 'timed-rupture-0042'
  },
  valid: {
    origin: 120,
    horizon: 30,
    ruptureTime: 141,
    certificate: 'timed-rupture-0041'
  }
};

const terminal = document.querySelector('#terminal-output');
const demoButtons = document.querySelectorAll('.demo-button');

function renderScenario(name) {
  if (!terminal || !scenarios[name]) return;

  const scenario = scenarios[name];
  const deadline = scenario.origin + scenario.horizon;
  const afterOrigin = scenario.ruptureTime > scenario.origin;
  const beforeDeadline = scenario.ruptureTime < deadline;
  const accepted = afterOrigin && beforeDeadline;

  const lines = [
    '$ verifier check certificate.json',
    '',
    `certificate_id:  ${scenario.certificate}`,
    `origin:          ${scenario.origin}`,
    `horizon:         ${scenario.horizon}`,
    `computed_limit:  ${deadline}`,
    `rupture_time:    ${scenario.ruptureTime}`,
    '',
    'recomputing claimed temporal boundary ...',
    `check 1: rupture_time > origin        ${afterOrigin ? 'PASS' : 'FAIL'}`,
    `check 2: rupture_time < origin+horizon ${beforeDeadline ? 'PASS' : 'FAIL'}`,
    ''
  ];

  if (accepted) {
    lines.push(
      'VERDICT: ACCEPT',
      'witness: all strict temporal constraints independently recomputed'
    );
  } else {
    const witness = !afterOrigin
      ? `${scenario.ruptureTime} <= ${scenario.origin}`
      : `${scenario.ruptureTime} >= ${deadline}`;
    lines.push(
      'VERDICT: REJECT',
      `witness: rupture_time violates the strict window (${witness})`,
      'action: certificate withheld; candidate returned for review'
    );
  }

  terminal.textContent = lines.join('\n');

  demoButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.scenario === name);
  });
}

demoButtons.forEach((button) => {
  button.addEventListener('click', () => renderScenario(button.dataset.scenario));
});

renderScenario('violation');
