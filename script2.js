const displayEl = document.getElementById('display');
const buttonsEl = document.querySelector('.buttons');

let currentInput = '';
let previousInput = '';
let operation = null;

buttonsEl.addEventListener('click', (e) => {
  const target = e.target;
  if (!target.classList.contains('btn')) return;

  if (target.dataset.number) {
    appendNumber(target.dataset.number);
  } else if (target.dataset.action) {
    handleAction(target.dataset.action);
  }
  updateDisplay();
});

function appendNumber(num) {
  if (num === '.' && currentInput.includes('.')) return;
  currentInput = currentInput.toString() + num.toString();
}

function handleAction(action) {
  switch (action) {
    case 'clear':
      currentInput = '';
      previousInput = '';
      operation = null;
      break;
    case 'delete':
      currentInput = currentInput.toString().slice(0, -1);
      break;
    case 'equals':
      compute();
      break;
    case 'add':
    case 'subtract':
    case 'multiply':
    case 'divide':
      chooseOperation(action);
      break;
  }
}

function chooseOperation(op) {
  if (currentInput === '') return;
  if (previousInput !== '') {
    compute();
  }
  operation = op;
  previousInput = currentInput;
  currentInput = '';
}

function compute() {
  let result;
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);
  if (isNaN(prev) || isNaN(curr)) return;
  switch (operation) {
    case 'add':
      result = prev + curr;
      break;
    case 'subtract':
      result = prev - curr;
      break;
    case 'multiply':
      result = prev * curr;
      break;
    case 'divide':
      result = curr === 0 ? 'Error' : prev / curr;
      break;
    default:
      return;
  }
  currentInput = result.toString();
  operation = null;
  previousInput = '';
}

function updateDisplay() {
  displayEl.textContent = currentInput || '0';
}
// script.js

const toggle = document.getElementById('theme-toggle');
const body   = document.body;
const KEY    = 'themePreference';

// Initialize theme on load
(function initTheme() {
  const saved = localStorage.getItem(KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (saved === 'dark' || (!saved && prefersDark)) {
    body.classList.add('dark');
    toggle.checked = true;
  }
})();

// Listen for toggle changes
toggle.addEventListener('change', () => {
  if (toggle.checked) {
    body.classList.add('dark');
    localStorage.setItem(KEY, 'dark');
  } else {
    body.classList.remove('dark');
    localStorage.setItem(KEY, 'light');
  }
});