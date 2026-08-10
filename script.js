const evidencePipelineSection = document.querySelector('section[aria-label="Evidence pipeline"]');
if (evidencePipelineSection) {
  evidencePipelineSection.classList.add('architecture-section');
}

const cvButton = document.querySelector('.actions .button.primary');
if (cvButton) {
  cvButton.textContent = 'View CV';
  cvButton.href = 'cv.html';
}

const menuButton = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
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
    startTime: 120,
    allowedInterval: 30,
    eventTime: 154,
    certificate: 'timed-event-0042'
  },
  valid: {
    startTime: 120,
    allowedInterval: 30,
    eventTime: 141,
    certificate: 'timed-event-0041'
  }
};

const terminal = document.querySelector('#terminal-output');
const demoButtons = document.querySelectorAll('.demo-button');

function renderScenario(name) {
  const scenario = scenarios[name];
  if (!terminal || !scenario) return;

  const deadline = scenario.startTime + scenario.allowedInterval;
  const isAfterStart = scenario.eventTime > scenario.startTime;
  const isBeforeDeadline = scenario.eventTime < deadline;
  const isAccepted = isAfterStart && isBeforeDeadline;

  const lines = [
    '$ checker verify example.json',
    '',
    `certificate_id:      ${scenario.certificate}`,
    `start_time:          ${scenario.startTime}`,
    `allowed_interval:    ${scenario.allowedInterval}`,
    `calculated_deadline: ${deadline}`,
    `claimed_event_time:  ${scenario.eventTime}`,
    '',
    'checking the time claim ...',
    `event is after the start:     ${isAfterStart ? 'PASS' : 'FAIL'}`,
    `event is before the deadline: ${isBeforeDeadline ? 'PASS' : 'FAIL'}`,
    ''
  ];

  if (isAccepted) {
    lines.push(
      'VERDICT: ACCEPT',
      'reason: both time conditions hold'
    );
  } else {
    const reason = !isAfterStart
      ? `${scenario.eventTime} is not greater than ${scenario.startTime}`
      : `${scenario.eventTime} is not less than ${deadline}`;

    lines.push(
      'VERDICT: REJECT',
      `reason: ${reason}`,
      'next step: do not release the certificate; return it for review'
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
