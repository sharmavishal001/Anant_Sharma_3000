const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => observer.observe(item));

function launchConfetti() {
  const layer = document.getElementById('confettiLayer');
  const colors = ['#f3b3a5', '#d6b27a', '#e88a99', '#8d9ccf', '#89c4b4', '#f2d77d'];

  if (!layer) return;

  layer.innerHTML = '';
  const total = 42;

  for (let i = 0; i < total; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty('--x', `${(Math.random() - 0.5) * 220}px`);
    piece.style.setProperty('--r', `${(Math.random() - 0.5) * 720}deg`);
    piece.style.animationDelay = `${Math.random() * 0.5}s`;
    piece.style.transform = `scale(${0.8 + Math.random() * 0.8})`;
    layer.appendChild(piece);
  }

  window.setTimeout(() => {
    layer.innerHTML = '';
  }, 3000);
}

document.getElementById('celebrateTrigger')?.addEventListener('click', launchConfetti);
