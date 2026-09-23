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
  const colors = ['#f3b3a5', '#d6b77b', '#e88a99', '#8d9ccf', '#89c4b4', '#f2d77d'];

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

const answerButtons = document.querySelectorAll('.answer-option');
const submitAnswersBtn = document.getElementById('submitAnswersBtn');
const scoreReveal = document.getElementById('scoreReveal');
const questionBlocks = document.querySelectorAll('.question-block');

function updateSubmitState() {
  if (!submitAnswersBtn) return;

  const allAnswered = [...questionBlocks].every((block) => block.querySelectorAll('.answer-option.selected').length > 0);
  submitAnswersBtn.disabled = !allAnswered;
}

answerButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const group = button.closest('.answer-group');
    if (!group) return;

    group.querySelectorAll('.answer-option').forEach((option) => {
      const isSelected = option === button;
      option.classList.toggle('selected', isSelected);
      option.setAttribute('aria-pressed', String(isSelected));
    });

    updateSubmitState();
  });
});

if (submitAnswersBtn && scoreReveal) {
  submitAnswersBtn.addEventListener('click', () => {
    if (submitAnswersBtn.disabled) {
      return;
    }

    scoreReveal.classList.remove('hidden');
    requestAnimationFrame(() => scoreReveal.classList.add('revealed'));
    submitAnswersBtn.textContent = 'Submitted ✓';
    submitAnswersBtn.disabled = true;
    launchConfetti();
  });
}

const questionBtn = document.getElementById('importantQuestionBtn');
const finalPuzzle = document.getElementById('finalPuzzle');
const submitPuzzleBtn = document.getElementById('submitPuzzleBtn');
const puzzleResult = document.getElementById('puzzleResult');

if (questionBtn && finalPuzzle) {
  questionBtn.addEventListener('click', () => {
    finalPuzzle.classList.remove('hidden');
    requestAnimationFrame(() => finalPuzzle.classList.add('revealed'));
    questionBtn.textContent = 'Answer already...';
    questionBtn.disabled = true;
    launchConfetti();
  });
}

if (submitPuzzleBtn && finalPuzzle && puzzleResult) {
  submitPuzzleBtn.addEventListener('click', () => {
    const selected = finalPuzzle.querySelector('.puzzle-option.selected');

    if (!selected) {
      puzzleResult.textContent = 'Pick an answer first. The suspense is real.';
      puzzleResult.classList.remove('hidden');
      return;
    }

    const isCorrect = selected.dataset.correct === 'true';

    if (isCorrect) {
      puzzleResult.textContent = 'Correct — B is in the middle. A is ahead, C is behind, and B is definitely not last.';
    } else {
      puzzleResult.textContent = 'Not quite. The correct answer is B — A is ahead, C is behind, and B is right in the middle.';
    }

    puzzleResult.classList.remove('hidden');
  });
}

const openSurpriseBtn = document.getElementById('openSurpriseBtn');
const surpriseScene = document.getElementById('surpriseScene');
const blowCandleBtn = document.getElementById('blowCandleBtn');
const cake = document.querySelector('.cake');
const celebrationScreen = document.getElementById('celebrationScreen');
const oneLastSurpriseBtn = document.getElementById('oneLastSurpriseBtn');
const videoSection = document.getElementById('videoSection');
const birthdayVideo = document.getElementById('birthdayVideo');
const confettiLayer = document.getElementById('confettiLayer');

function burstHearts() {
  const container = celebrationScreen || document.body;
  const heartCount = 18;

  for (let i = 0; i < heartCount; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'heart-popper';
    heart.style.setProperty('--left', `${Math.random() * 100}%`);
    heart.style.setProperty('--top', `${Math.random() * 18 + 10}%`);
    heart.style.setProperty('--size', `${16 + Math.random() * 18}px`);
    heart.style.setProperty('--drift', `${(Math.random() - 0.5) * 180}px`);
    container.appendChild(heart);
    window.setTimeout(() => heart.remove(), 2500);
  }
}

function clearCelebrationState() {
  if (celebrationScreen) {
    celebrationScreen.classList.add('hidden');
  }

  if (surpriseScene) {
    surpriseScene.classList.add('hidden');
  }

  if (confettiLayer) {
    confettiLayer.innerHTML = '';
  }

  document.querySelectorAll('.heart-popper').forEach((heart) => heart.remove());
}

if (openSurpriseBtn && surpriseScene) {
  openSurpriseBtn.addEventListener('click', () => {
    surpriseScene.classList.remove('hidden');
    surpriseScene.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (celebrationScreen) {
      celebrationScreen.classList.add('hidden');
    }
    launchConfetti();
  });
}

if (blowCandleBtn && cake) {
  blowCandleBtn.addEventListener('click', () => {
    cake.classList.add('cake-extinguished');
    blowCandleBtn.textContent = 'Birthday unlocked ✨';
    blowCandleBtn.disabled = true;
    launchConfetti();
    burstHearts();

    if (celebrationScreen) {
      celebrationScreen.classList.remove('hidden');
      requestAnimationFrame(() => celebrationScreen.classList.add('revealed'));
    }
  });
}

if (oneLastSurpriseBtn && videoSection && birthdayVideo) {
  oneLastSurpriseBtn.addEventListener('click', () => {
    clearCelebrationState();
    birthdayVideo.setAttribute('src', 'assets/WhatsApp Video 2026-09-23 at 13.37.48.mp4');
    birthdayVideo.load();
    videoSection.classList.remove('hidden');
    videoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    birthdayVideo.play().catch(() => {});
  });
}

updateSubmitState();
