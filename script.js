document.body.classList.add('dim');

const envelope = document.getElementById('envelope');
const pages = document.querySelectorAll('.page-flow');
const memoryContainer = document.getElementById('memories');
const MEMORY_COUNT = 40;

let currentPage = 0;
let opened = false;
let finished = false;
let isAnimating = false;

// Memórias
for (let i = 0; i < MEMORY_COUNT; i++) {
  const m = document.createElement('div');
  m.classList.add('memory');

  const size = Math.random() * 3 + 2;
  const duration = Math.random() * 6 + 4;
  const delay = Math.random() * 5;

  m.style.width = `${size}px`;
  m.style.height = `${size}px`;
  m.style.left = `${Math.random() * 100}vw`;
  m.style.top = `${Math.random() * 100}vh`;
  m.style.animationDuration = `${duration}s`;
  m.style.animationDelay = `${delay}s`;
  m.style.animationTimingFunction =
  Math.random() > 0.5
    ? 'cubic-bezier(0.4, 0, 0.2, 1)'
    : 'ease-in-out';

  memoryContainer.appendChild(m);
}

// Abertura da carta
envelope.addEventListener('click', () => {
  if (isAnimating) return;

  if (envelope.classList.contains('closed-final')) {
    envelope.classList.remove('closed-final');
  }

  if (opened) return;

  isAnimating = false;
  letter.classList.remove('closing', 'fade-out');

  pages.forEach(page => page.classList.remove('active', 'exit'));
  currentPage = 0;
  pages[0].classList.add('active');

  opened = true;
  envelope.classList.add('open');

  if (!document.querySelector('.initial-seal')) {
    const seal = document.createElement('div');
    seal.classList.add('seal', 'initial-seal');
    seal.innerHTML = '<span>♥</span>';
    envelope.appendChild(seal);
  }

  setTimeout(() => {
    const seal = document.querySelector('.initial-seal');
    if (seal) seal.remove();
  }, 800);
});



// Troca de páginas
letter.addEventListener('click', (e) => {
  e.stopPropagation();
  if (isAnimating) return;

  const current = pages[currentPage];

  if (current.classList.contains('final')) {
    if (!letter.classList.contains('closing')) {
      endLetter();
    }
    return;
  }

  const nextIndex = (currentPage + 1) % pages.length;
  const next = pages[nextIndex];

  isAnimating = true;

  current.classList.add('exit');
  current.classList.remove('active');

  setTimeout(() => {
    current.classList.remove('exit');

    next.classList.add('active');
    currentPage = nextIndex;

    setTimeout(() => {
      isAnimating = false;
    }, 600);
  }, 600);
});

// Encerramento da carta
function endLetter() {
  if (envelope.classList.contains('closed-final')) return;

  isAnimating = true;

  letter.classList.add('closing');

  pages[currentPage].classList.remove('active');

  setTimeout(() => {
    envelope.classList.remove('open');
  }, 200);

  setTimeout(() => {
    envelope.classList.add('closed-final');
  }, 900);

  setTimeout(() => {
    const oldSeal = envelope.querySelector('.final-seal');
    if (oldSeal) oldSeal.remove();

    const finalSeal = document.createElement('div');
    finalSeal.classList.add('final-seal', 'animate');
    finalSeal.innerHTML = '<span>♥</span>';
    envelope.appendChild(finalSeal);
  }, 900);

  setTimeout(() => {
    const secret = document.getElementById('secretMessage');
    letter.classList.add('fade-out');
    opened = false;
    finished = true;
    isAnimating = false;
    if (secret) {
      secret.classList.add('visible');
    }
  }, 5000);
}
