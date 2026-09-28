/**
 * Birthday Surprise Website for Anjali
 * Personal Gift from Sourabh - Ultra Interactive & Crazy Edition
 */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientPetals();
  initSparkleCursorTrail();
  initFireworksCanvas();
  initConfettiCannon();
  initGiftProgression();
  initLivePortraitFilters();
  initSuperpowersAndCompliments();
  initPhotoGallery();
  initWishStars();
  initScratchCoupon();
  initFortuneWheel();
  initVirtualCake();
  initBalloonSky();
  initCrazyPartyMode();
  initSoundboard();
  initAudioEngine();
  initClosingActions();
});

/* ==========================================================================
   1. AMBIENT BACKGROUND PETALS CANVAS
   ========================================================================== */
function initAmbientPetals() {
  const canvas = document.getElementById('ambientCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const colors = [
    'rgba(243, 168, 157, 0.45)', // blush coral
    'rgba(250, 204, 196, 0.55)', // soft rose
    'rgba(245, 229, 186, 0.45)', // champagne gold
    'rgba(230, 133, 119, 0.4)'   // warm blush
  ];

  class Petal {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = Math.random() * 8 + 5;
      this.speedY = Math.random() * 0.7 + 0.4;
      this.speedX = Math.sin(Math.random() * Math.PI) * 0.5;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 1.3;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.angle = Math.random() * Math.PI * 2;
    }
    update() {
      this.angle += 0.015;
      this.x += Math.sin(this.angle) * 0.5 + this.speedX;
      this.y += this.speedY;
      this.rotation += this.rotationSpeed;

      if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
        this.reset();
      }
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 2, 0, this.size);
      ctx.bezierCurveTo(this.size, this.size / 2, this.size / 2, -this.size / 2, 0, 0);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 28; i++) {
    petals.push(new Petal());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    petals.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(render);
  }
  render();
}

/* ==========================================================================
   2. SPARKLE CURSOR & TOUCH TRAIL CANVAS
   ========================================================================== */
function initSparkleCursorTrail() {
  const canvas = document.getElementById('sparkleTrailCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const sparkles = [];
  const symbols = ['✨', '💛', '🌸', '⭐', '💖'];

  class Sparkle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
      this.size = Math.random() * 14 + 10;
      this.alpha = 1;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2 - 0.5;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 4;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= 0.025;
      this.rotation += this.rotationSpeed;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.font = `${this.size}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.symbol, 0, 0);
      ctx.restore();
    }
  }

  function addSparkles(x, y, count = 2) {
    for (let i = 0; i < count; i++) {
      sparkles.push(new Sparkle(x + (Math.random() - 0.5) * 10, y + (Math.random() - 0.5) * 10));
    }
  }

  window.addEventListener('mousemove', (e) => {
    addSparkles(e.clientX, e.clientY, 1);
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      addSparkles(e.touches[0].clientX, e.touches[0].clientY, 2);
    }
  });

  function render() {
    ctx.clearRect(0, 0, width, height);
    for (let i = sparkles.length - 1; i >= 0; i--) {
      sparkles[i].update();
      sparkles[i].draw();
      if (sparkles[i].alpha <= 0) {
        sparkles.splice(i, 1);
      }
    }
    requestAnimationFrame(render);
  }
  render();
}

/* ==========================================================================
   3. FIREWORKS & CONFETTI CANNONS
   ========================================================================== */
let fireworksCtx = null;
let fireworksCanvas = null;
let fireworkSparks = [];

let cannonCanvas = null;
let cannonCtx = null;
let cannonConfetti = [];

function initFireworksCanvas() {
  fireworksCanvas = document.getElementById('fireworksCanvas');
  if (!fireworksCanvas) return;
  fireworksCtx = fireworksCanvas.getContext('2d');

  fireworksCanvas.width = window.innerWidth;
  fireworksCanvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    if (fireworksCanvas) {
      fireworksCanvas.width = window.innerWidth;
      fireworksCanvas.height = window.innerHeight;
    }
  });

  function renderFireworks() {
    if (fireworksCtx && fireworkSparks.length > 0) {
      fireworksCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
      for (let i = fireworkSparks.length - 1; i >= 0; i--) {
        const s = fireworkSparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.05; // gravity
        s.alpha -= 0.016;

        fireworksCtx.save();
        fireworksCtx.globalAlpha = Math.max(0, s.alpha);
        fireworksCtx.fillStyle = s.color;
        fireworksCtx.beginPath();
        fireworksCtx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        fireworksCtx.fill();
        fireworksCtx.restore();

        if (s.alpha <= 0) {
          fireworkSparks.splice(i, 1);
        }
      }
    }
    requestAnimationFrame(renderFireworks);
  }
  renderFireworks();
}

function launchFireworks(x = null, y = null) {
  if (!fireworksCanvas) return;
  const targetX = x !== null ? x : Math.random() * (window.innerWidth - 200) + 100;
  const targetY = y !== null ? y : Math.random() * (window.innerHeight * 0.45) + 100;

  const colors = ['#FF6B81', '#FFD700', '#FFA502', '#FF4757', '#70A1FF', '#2ED573', '#FF9FF3'];
  const count = 45;

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
    const speed = Math.random() * 4.5 + 2;
    fireworkSparks.push({
      x: targetX,
      y: targetY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: Math.random() * 2.5 + 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1
    });
  }
}

function initConfettiCannon() {
  cannonCanvas = document.getElementById('confettiCannonCanvas');
  if (!cannonCanvas) return;
  cannonCtx = cannonCanvas.getContext('2d');

  cannonCanvas.width = window.innerWidth;
  cannonCanvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    if (cannonCanvas) {
      cannonCanvas.width = window.innerWidth;
      cannonCanvas.height = window.innerHeight;
    }
  });

  function renderConfetti() {
    if (cannonCtx && cannonConfetti.length > 0) {
      cannonCtx.clearRect(0, 0, cannonCanvas.width, cannonCanvas.height);
      for (let i = cannonConfetti.length - 1; i >= 0; i--) {
        const c = cannonConfetti[i];
        c.x += c.vx;
        c.y += c.vy;
        c.vy += c.gravity;
        c.rotation += c.rotSpeed;
        c.alpha -= 0.008;

        cannonCtx.save();
        cannonCtx.globalAlpha = Math.max(0, c.alpha);
        cannonCtx.translate(c.x, c.y);
        cannonCtx.rotate((c.rotation * Math.PI) / 180);
        cannonCtx.fillStyle = c.color;
        cannonCtx.fillRect(-c.width / 2, -c.height / 2, c.width, c.height);
        cannonCtx.restore();

        if (c.alpha <= 0 || c.y > cannonCanvas.height + 50) {
          cannonConfetti.splice(i, 1);
        }
      }
    }
    requestAnimationFrame(renderConfetti);
  }
  renderConfetti();
}

function launchConfettiBurst(originX = null, originY = null) {
  if (!cannonCanvas) return;
  const startX = originX !== null ? originX : window.innerWidth / 2;
  const startY = originY !== null ? originY : window.innerHeight / 2;

  const colors = ['#E68577', '#D8B756', '#FACCC4', '#F5E5BA', '#BA5346', '#70A1FF', '#2ED573'];
  const count = 70;

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 8 + 3;
    cannonConfetti.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3,
      gravity: 0.16,
      width: Math.random() * 8 + 6,
      height: Math.random() * 12 + 8,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1
    });
  }
}

function fireCornerConfettiCannons() {
  if (!cannonCanvas) return;
  const colors = ['#E68577', '#D8B756', '#FACCC4', '#F5E5BA', '#FF6B81', '#2ED573', '#FFD700'];

  // Left Cannon
  for (let i = 0; i < 50; i++) {
    const angle = -Math.PI / 4 + (Math.random() - 0.5) * 0.5;
    const speed = Math.random() * 12 + 6;
    cannonConfetti.push({
      x: 20,
      y: window.innerHeight - 20,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      gravity: 0.18,
      width: Math.random() * 8 + 5,
      height: Math.random() * 12 + 6,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1
    });
  }

  // Right Cannon
  for (let i = 0; i < 50; i++) {
    const angle = (-3 * Math.PI) / 4 + (Math.random() - 0.5) * 0.5;
    const speed = Math.random() * 12 + 6;
    cannonConfetti.push({
      x: window.innerWidth - 20,
      y: window.innerHeight - 20,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      gravity: 0.18,
      width: Math.random() * 8 + 5,
      height: Math.random() * 12 + 6,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1
    });
  }
}

/* ==========================================================================
   4. SEQUENTIAL 5-GIFT PROGRESSION ENGINE
   ========================================================================== */
function initGiftProgression() {
  const openGiftMainBtn = document.getElementById('openGiftMainBtn');
  const luxuryGiftBox = document.getElementById('luxuryGiftBox');
  const initialSurpriseStage = document.getElementById('initialSurpriseStage');
  const revealedHeroSection = document.getElementById('revealedHeroSection');
  const gift1Section = document.getElementById('gift1Section');
  const startGiftsBtn = document.getElementById('startGiftsBtn');

  function openMainGift() {
    if (luxuryGiftBox) luxuryGiftBox.classList.add('opened');

    playChimeSound(523.25); // C5
    setTimeout(() => playChimeSound(659.25), 150); // E5
    setTimeout(() => playChimeSound(783.99), 300); // G5
    setTimeout(() => playChimeSound(1046.5), 450); // C6

    fireCornerConfettiCannons();
    launchFireworks();

    setTimeout(() => {
      if (initialSurpriseStage) initialSurpriseStage.classList.add('hidden-section');
      if (revealedHeroSection) revealedHeroSection.classList.remove('hidden-section');
      if (gift1Section) gift1Section.classList.remove('hidden-section');

      // Auto-activate Queen Crown filter by default
      const crown = document.getElementById('virtualCrown');
      const crownBtn = document.getElementById('filterCrownBtn');
      const topCrownBtn = document.getElementById('crownToggleBtn');
      if (crown) crown.classList.add('active');
      if (crownBtn) crownBtn.classList.add('active-filter');
      if (topCrownBtn) topCrownBtn.classList.add('active-crown');

      updateProgressStep(1);
      showToast('✨ Surprise Unlocked for Anjali! 🎂💖');

      setTimeout(() => {
        if (revealedHeroSection) {
          revealedHeroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
    }, 600);
  }

  if (openGiftMainBtn) openGiftMainBtn.addEventListener('click', openMainGift);
  if (luxuryGiftBox) luxuryGiftBox.addEventListener('click', openMainGift);

  if (startGiftsBtn) {
    startGiftsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (gift1Section) {
        gift1Section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Next Gift Buttons Handler
  const nextGiftBtns = document.querySelectorAll('.next-gift-btn');
  nextGiftBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-next');
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.classList.remove('hidden-section');
        
        let stepNumber = 1;
        if (targetId === 'gift2Section') stepNumber = 2;
        else if (targetId === 'gift3Section') stepNumber = 3;
        else if (targetId === 'gift4Section') stepNumber = 4;
        else if (targetId === 'gift5Section') stepNumber = 5;

        updateProgressStep(stepNumber);
        launchConfettiBurst();
        playChimeSound(523.25 + stepNumber * 50);

        setTimeout(() => {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    });
  });
}

function updateProgressStep(currentStep) {
  for (let i = 1; i <= 5; i++) {
    const stepEl = document.getElementById(`step${i}`);
    if (stepEl) {
      if (i < currentStep) {
        stepEl.className = 'progress-step completed';
      } else if (i === currentStep) {
        stepEl.className = 'progress-step active';
      } else {
        stepEl.className = 'progress-step';
      }
    }
  }
}

/* ==========================================================================
   5. LIVE PHOTO FILTERS FOR ANJALI (CROWN, SHADES, AURA)
   ========================================================================== */
function initLivePortraitFilters() {
  const crownOverlay = document.getElementById('virtualCrown');
  const shadesOverlay = document.getElementById('virtualShades');
  const auraOverlay = document.getElementById('virtualAura');

  const crownFilterBtn = document.getElementById('filterCrownBtn');
  const shadesFilterBtn = document.getElementById('filterShadesBtn');
  const auraFilterBtn = document.getElementById('filterAuraBtn');
  const topCrownToggleBtn = document.getElementById('crownToggleBtn');

  function toggleCrown() {
    if (!crownOverlay) return;
    const isActive = crownOverlay.classList.toggle('active');
    if (crownFilterBtn) crownFilterBtn.classList.toggle('active-filter', isActive);
    if (topCrownToggleBtn) topCrownToggleBtn.classList.toggle('active-crown', isActive);
    
    if (isActive) {
      playChimeSound(900);
      launchFireworks();
      showToast('👑 Queen Anjali Crown Activated! ✨');
    }
  }

  function toggleShades() {
    if (!shadesOverlay) return;
    const isActive = shadesOverlay.classList.toggle('active');
    if (shadesFilterBtn) shadesFilterBtn.classList.toggle('active-filter', isActive);
    
    if (isActive) {
      playChimeSound(450);
      showToast('🕶️ Cool Boss Anjali Mode Activated!');
    }
  }

  function toggleAura() {
    if (!auraOverlay) return;
    const isActive = auraOverlay.classList.toggle('active');
    if (auraFilterBtn) auraFilterBtn.classList.toggle('active-filter', isActive);
    
    if (isActive) {
      playChimeSound(750);
      launchConfettiBurst();
      showToast('💖 Fairy Angel Glow Activated!');
    }
  }

  if (crownFilterBtn) crownFilterBtn.addEventListener('click', toggleCrown);
  if (topCrownToggleBtn) topCrownToggleBtn.addEventListener('click', toggleCrown);
  if (shadesFilterBtn) shadesFilterBtn.addEventListener('click', toggleShades);
  if (auraFilterBtn) auraFilterBtn.addEventListener('click', toggleAura);
}

/* ==========================================================================
   6. ANJALI'S SUPERPOWERS & CRAZY COMPLIMENT GENERATOR
   ========================================================================== */
function initSuperpowersAndCompliments() {
  const genBtn = document.getElementById('generateComplimentBtn');
  const compCard = document.getElementById('complimentCard');
  const compText = document.getElementById('complimentText');

  const compliments = [
    '“Anjali’s smile has been clinically proven to fix bad days in 0.2 seconds flat!” 💖',
    '“Certified #1 Best Friend in the solar system — zero competition!” 🏆',
    '“The sweetest mother-baby bond in existence. Pure heart of gold!” 👶✨',
    '“Warning: Talking to Anjali may cause contagious laughter and instant good moods!” 😄',
    '“Royal decree: Today Anjali does zero chores and receives 100% royal treatment!” 👑',
    '“Kindness level: 10,000%. Grace level: Infinite. Friend rating: 5 Stars!” 🌸',
    '“Scientifically proven to make every family trip and casual hangout 10x more fun!” 🍕',
    '“A true queen who always knows how to lift everyone up. Happy Birthday, Anjali!” 💛'
  ];

  let lastIndex = -1;

  if (genBtn && compText) {
    genBtn.addEventListener('click', () => {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * compliments.length);
      } while (nextIndex === lastIndex && compliments.length > 1);
      lastIndex = nextIndex;

      compCard.style.transform = 'scale(0.95)';
      setTimeout(() => {
        compText.textContent = compliments[nextIndex];
        compCard.style.transform = 'scale(1)';
      }, 150);

      playChimeSound(680);
      launchFireworks();
      showToast('🎲 New Anjali Praise Unlocked! ✨');
    });
  }
}

/* ==========================================================================
   7. PHOTO GALLERY: STREAMLINED TOP 5 POLAROID SHOWCASE
   ========================================================================== */
function initPhotoGallery() {
  const photoCards = document.querySelectorAll('.polaroid-card');
  const photoGrid = document.getElementById('photoGrid');
  const shuffleBtn = document.getElementById('shufflePhotosBtn');
  const autoSlideBtn = document.getElementById('autoSlideBtn');

  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');

  const galleryData = [];

  photoCards.forEach((card, idx) => {
    const img = card.querySelector('img');
    const cap = card.querySelector('.polaroid-caption');
    galleryData.push({
      src: img ? img.src : '',
      alt: img ? img.alt : `Photo ${idx + 1}`,
      caption: cap ? cap.textContent : 'A beautiful moment 🌸'
    });

    card.addEventListener('click', () => {
      openLightbox(idx);
    });
  });

  // Shuffle Polaroid Angles
  if (shuffleBtn && photoGrid) {
    shuffleBtn.addEventListener('click', () => {
      const cardsArr = Array.from(photoGrid.children);
      cardsArr.forEach((c) => {
        const randDeg = (Math.random() * 8 - 4).toFixed(1);
        c.style.transform = `rotate(${randDeg}deg)`;
      });
      playChimeSound(600);
      showToast('🔀 Polaroid angles shuffled!');
    });
  }

  // Auto Slideshow Feature
  let autoSlideTimer = null;
  if (autoSlideBtn) {
    autoSlideBtn.addEventListener('click', () => {
      if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
        autoSlideBtn.textContent = '▶️ Auto Slideshow';
        showToast('⏸️ Auto slideshow stopped');
      } else {
        openLightbox(0);
        autoSlideTimer = setInterval(() => {
          showNextPhoto();
        }, 3000);
        autoSlideBtn.textContent = '⏹️ Stop Slideshow';
        showToast('▶️ Auto slideshow running (3s per photo)');
      }
    });
  }

  let currentPhotoIndex = 0;

  function openLightbox(idx) {
    currentPhotoIndex = idx;
    updateLightbox();
    if (lightboxModal) {
      lightboxModal.classList.add('active');
      lightboxModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      lightboxModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
        if (autoSlideBtn) autoSlideBtn.textContent = '▶️ Auto Slideshow';
      }
    }
  }

  function updateLightbox() {
    if (!galleryData[currentPhotoIndex]) return;
    const item = galleryData[currentPhotoIndex];
    if (lightboxImg) {
      lightboxImg.src = item.src;
      lightboxImg.alt = item.alt;
    }
    if (lightboxCaption) lightboxCaption.textContent = item.caption;
    if (lightboxCounter) lightboxCounter.textContent = `${currentPhotoIndex + 1} / ${galleryData.length}`;
  }

  function showPrevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + galleryData.length) % galleryData.length;
    updateLightbox();
    playChimeSound(500);
  }

  function showNextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % galleryData.length;
    updateLightbox();
    playChimeSound(550);
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevPhoto);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextPhoto);

  document.addEventListener('keydown', (e) => {
    if (lightboxModal && lightboxModal.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrevPhoto();
      if (e.key === 'ArrowRight') showNextPhoto();
    }
  });
}

/* ==========================================================================
   8. GIFT 3: 3D FORTUNE BLESSING SPINNER WHEEL
   ========================================================================== */
function initFortuneWheel() {
  const wheel = document.getElementById('fortuneWheel');
  const spinBtn = document.getElementById('spinWheelBtn');
  const resultToast = document.getElementById('wheelResultToast');
  const resultText = document.getElementById('wheelResText');

  if (!wheel || !spinBtn) return;

  const blessings = [
    { name: '🕊️ Deep Peace & Serenity', text: '“A year overflowing with quiet comfort and deep peace in your soul.” ✨' },
    { name: '👶 Endless Baby Giggles', text: '“Heartwarming giggles, milestones, and precious bonding with your baby!” 💛' },
    { name: '✈️ Spontaneous Dream Trip', text: '“A refreshing vacation full of scenic views and sweet memories!” 🌸' },
    { name: '💆 Guilt-Free Pamper Days', text: '“Guilt-free self-care, relaxing spa moments, and peaceful chai breaks!” ☕' },
    { name: '💎 Pure Good Luck & Prosperity', text: '“Every effort turns to gold with continuous blessings in your home!” 🌟' },
    { name: '🌸 Unstoppable Golden Glow', text: '“Radiance, good health, and joyful energy that lights up everywhere!” 💖' }
  ];

  let isSpinning = false;
  let currentRotation = 0;

  spinBtn.addEventListener('click', () => {
    if (isSpinning) return;
    isSpinning = true;

    const sliceAngle = 60;
    const chosenIndex = Math.floor(Math.random() * blessings.length);
    const extraRounds = 5 + Math.floor(Math.random() * 3);
    const targetAngle = extraRounds * 360 + (360 - chosenIndex * sliceAngle - sliceAngle / 2);

    currentRotation += targetAngle;
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    playChimeSound(400);
    setTimeout(() => playChimeSound(500), 500);
    setTimeout(() => playChimeSound(600), 1000);

    setTimeout(() => {
      isSpinning = false;
      const won = blessings[chosenIndex];
      if (resultText) resultText.textContent = `${won.name}: ${won.text}`;
      if (resultToast) {
        resultToast.style.borderColor = 'var(--gold-500)';
        resultToast.style.boxShadow = '0 0 15px rgba(216, 183, 86, 0.4)';
      }

      playVictoryFanfare();
      launchFireworks();
      launchConfettiBurst();
      showToast(`🎡 Fortune: ${won.name}! ✨`);
    }, 3600);
  });
}

/* ==========================================================================
   9. GIFT 4: FIVE WISH STARS & SCRATCH VIP COUPON
   ========================================================================== */
function initWishStars() {
  const wishCards = document.querySelectorAll('.wish-star-card');
  const unlockedCountEl = document.getElementById('unlockedWishesCount');
  let unlockedCount = 0;

  wishCards.forEach((card) => {
    card.addEventListener('click', () => {
      if (!card.classList.contains('revealed')) {
        card.classList.add('revealed');
        unlockedCount++;
        if (unlockedCountEl) unlockedCountEl.textContent = `${unlockedCount} / 5`;

        playChimeSound(523.25 + unlockedCount * 60);
        launchFireworks();
        showToast('⭐ Birthday wish unlocked!');

        if (unlockedCount === 5) {
          setTimeout(() => {
            launchConfettiBurst();
            showToast('✨ All 5 birthday wishes unlocked for Anjali!');
          }, 400);
        }
      } else {
        card.classList.remove('revealed');
      }
    });
  });
}

function initScratchCoupon() {
  const scratchCoupon = document.getElementById('scratchCoupon');
  if (scratchCoupon) {
    scratchCoupon.addEventListener('click', () => {
      if (!scratchCoupon.classList.contains('scratched')) {
        scratchCoupon.classList.add('scratched');
        launchConfettiBurst();
        playChimeSound(880);
        showToast('🎟️ VIP Best Friend Lifetime Pass Activated for Anjali!');
      }
    });
  }
}

/* ==========================================================================
   10. GIFT 5: MULTI-CANDLE VIRTUAL CAKE CEREMONY
   ========================================================================== */
function initVirtualCake() {
  const cakeStage = document.getElementById('cakeStage');
  const flames = document.querySelectorAll('.candle-flame');
  const cakeHalo = document.getElementById('cakeHalo');
  const tapCandlePrompt = document.getElementById('tapCandlePrompt');
  const wishSealedBanner = document.getElementById('wishSealedBanner');

  let cakeBlown = false;

  if (cakeStage) {
    cakeStage.addEventListener('click', () => {
      if (!cakeBlown) {
        cakeBlown = true;
        flames.forEach((f) => f.classList.add('blown-out'));
        if (cakeHalo) cakeHalo.style.opacity = '0.2';
        if (tapCandlePrompt) tapCandlePrompt.style.display = 'none';
        if (wishSealedBanner) wishSealedBanner.classList.add('active');

        playCandleChime();
        launchConfettiBurst();
        launchFireworks();
        fireCornerConfettiCannons();
        showToast('🎂 Candles blown! Your Birthday Wish is sealed, Anjali! ✨');
      } else {
        // Relight candles
        cakeBlown = false;
        flames.forEach((f) => f.classList.remove('blown-out'));
        if (cakeHalo) cakeHalo.style.opacity = '1';
        if (tapCandlePrompt) tapCandlePrompt.style.display = 'block';
        if (wishSealedBanner) wishSealedBanner.classList.remove('active');

        playChimeSound(523.25);
        showToast('🕯️ Candles relit! Ready for another wish!');
      }
    });
  }
}

/* ==========================================================================
   11. CRAZY PARTY BLAST MODE & DISCO OVERLAY
   ========================================================================== */
function initCrazyPartyMode() {
  const fab = document.getElementById('crazyPartyFab');
  if (!fab) return;

  fab.addEventListener('click', () => {
    document.body.classList.add('party-screen-shake');
    document.body.classList.add('disco-active');

    setTimeout(() => {
      document.body.classList.remove('party-screen-shake');
    }, 650);

    // Launch triple confetti cannons & massive fireworks
    fireCornerConfettiCannons();
    setTimeout(fireCornerConfettiCannons, 400);
    setTimeout(fireCornerConfettiCannons, 800);

    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        launchFireworks(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight * 0.5
        );
      }, i * 180);
    }

    // Switch to Crazy Party Track
    const trackSelect = document.getElementById('musicTrackSelect');
    if (trackSelect) trackSelect.value = '3';
    selectedTrack = 3;
    if (!isMusicPlaying) {
      toggleMusic(true);
    }

    playPartyHornFX();
    showToast('💥 CRAZY PARTY BLAST MODE ACTIVATED! 🎉✨🎈');
  });
}

/* ==========================================================================
   12. INTERACTIVE FLOATING HELIUM BALLOON POPPING MINI-GAME
   ========================================================================== */
let balloonPopCount = 0;

function initBalloonSky() {
  const sky = document.getElementById('balloonSky');
  const spawnBtn = document.getElementById('spawnBalloonsBtn');
  const partyScoreBadge = document.getElementById('partyScoreBadge');

  const balloonHues = ['#FF6B81', '#FAD390', '#70A1FF', '#2ED573', '#FF9FF3', '#ECCC68'];
  const popCompliments = [
    '🌟 Radiant Smile!',
    '👶 Best Mom Ever!',
    '🌸 Grace & Elegance!',
    '💛 Cherished Friend!',
    '✨ Endless Joy!',
    '👑 Queen Anjali!'
  ];

  function spawnOneBalloon() {
    if (!sky) return;
    const b = document.createElement('div');
    b.className = 'floating-balloon';

    const color = balloonHues[Math.floor(Math.random() * balloonHues.length)];
    const left = Math.random() * 85 + 5;
    const duration = Math.random() * 5 + 8; // 8s to 13s

    b.style.left = `${left}vw`;
    b.style.animation = `balloonRiseAnim ${duration}s linear forwards`;

    b.innerHTML = `
      <svg width="55" height="80" viewBox="0 0 60 85">
        <ellipse cx="30" cy="35" rx="26" ry="32" fill="${color}" />
        <ellipse cx="22" cy="22" rx="7" ry="12" fill="rgba(255,255,255,0.4)" />
        <polygon points="30,67 26,73 34,73" fill="${color}" />
        <path d="M30,73 Q33,78 30,84" stroke="rgba(100,100,100,0.5)" stroke-width="1.5" fill="none" />
      </svg>
    `;

    b.addEventListener('click', (e) => {
      e.stopPropagation();
      playPopSound();
      launchFireworks(e.clientX, e.clientY);

      balloonPopCount++;
      if (partyScoreBadge) partyScoreBadge.textContent = `${balloonPopCount} 🎈`;

      const comp = popCompliments[Math.floor(Math.random() * popCompliments.length)];
      showBalloonToken(e.clientX, e.clientY, comp);

      b.remove();
    });

    sky.appendChild(b);

    setTimeout(() => {
      b.remove();
    }, duration * 1000);
  }

  const animStyle = document.createElement('style');
  animStyle.textContent = `
    @keyframes balloonRiseAnim {
      0% { transform: translateY(0) rotate(0deg); opacity: 0.95; }
      100% { transform: translateY(-115vh) rotate(12deg); opacity: 0.8; }
    }
  `;
  document.head.appendChild(animStyle);

  // Periodic gentle balloon spawn
  setInterval(spawnOneBalloon, 3500);

  if (spawnBtn) {
    spawnBtn.addEventListener('click', () => {
      for (let i = 0; i < 6; i++) {
        setTimeout(spawnOneBalloon, i * 180);
      }
      showToast('🎈 Balloons released into the sky! Tap to pop!');
    });
  }
}

function showBalloonToken(x, y, text) {
  const t = document.createElement('div');
  t.className = 'balloon-token-toast';
  t.textContent = text;
  t.style.left = `${x}px`;
  t.style.top = `${y}px`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1200);
}

/* ==========================================================================
   13. SOUNDBOARD & SOUND FX ENGINE (PURE SYNTHESIS)
   ========================================================================== */
function initSoundboard() {
  const soundChips = document.querySelectorAll('.sound-chip');
  soundChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const type = chip.getAttribute('data-sound');
      if (type === 'cheer') playVictoryFanfare();
      else if (type === 'horn') playPartyHornFX();
      else if (type === 'sparkle') playChimeSound(1200);
      else if (type === 'pop') {
        playPopSound();
        launchConfettiBurst();
      } else if (type === 'drum') playDrumRollFX();
      else if (type === 'party') {
        playPartyHornFX();
        launchFireworks();
      }
    });
  });
}

function playDrumRollFX() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  for (let i = 0; i < 15; i++) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140 + Math.random() * 20, now + i * 0.05);
    gain.gain.setValueAtTime(0.2, now + i * 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.05 + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + i * 0.05);
    osc.stop(now + i * 0.05 + 0.04);
  }
  // Cymbal Crash
  setTimeout(() => {
    playChimeSound(880);
    launchFireworks();
  }, 750);
}

/* ==========================================================================
   14. WEB AUDIO API SYNTHESIZER (4 TRACKS)
   ========================================================================== */
let audioCtx = null;
let isMusicPlaying = false;
let selectedTrack = 0;
let melodyInterval = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function initAudioEngine() {
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const musicTrackSelect = document.getElementById('musicTrackSelect');

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
      toggleMusic();
    });
  }

  if (musicTrackSelect) {
    musicTrackSelect.addEventListener('change', (e) => {
      selectedTrack = parseInt(e.target.value, 10) || 0;
      if (isMusicPlaying) {
        stopMelody();
        startMelody();
      }
    });
  }
}

function toggleMusic(forcePlay = false) {
  if (forcePlay || !isMusicPlaying) {
    const ctx = getAudioContext();
    if (!ctx) return;
    isMusicPlaying = true;
    startMelody();
    updateAudioUI(true);
    showToast('🎵 Birthday Melody Playing ✨');
  } else {
    isMusicPlaying = false;
    stopMelody();
    updateAudioUI(false);
    showToast('🔇 Music Muted');
  }
}

function updateAudioUI(playing) {
  const icon = document.getElementById('musicIcon');
  const label = document.getElementById('musicLabel');
  if (icon) icon.textContent = playing ? '🔊' : '🔇';
  if (label) label.textContent = playing ? 'Playing' : 'Music';
  if (playing) {
    document.body.classList.add('music-active');
  } else {
    document.body.classList.remove('music-active');
  }
}

function startMelody() {
  stopMelody();
  const ctx = getAudioContext();
  if (!ctx) return;

  // Happy Birthday Notes Frequencies
  const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.0, A4 = 440.0, B4 = 493.88, C5 = 523.25;

  const tracks = [
    // Track 0: Soft Music Box
    [
      { f: C4, d: 0.4 }, { f: C4, d: 0.2 }, { f: D4, d: 0.6 }, { f: C4, d: 0.6 }, { f: F4, d: 0.6 }, { f: E4, d: 1.0 },
      { f: C4, d: 0.4 }, { f: C4, d: 0.2 }, { f: D4, d: 0.6 }, { f: C4, d: 0.6 }, { f: G4, d: 0.6 }, { f: F4, d: 1.0 },
      { f: C4, d: 0.4 }, { f: C4, d: 0.2 }, { f: C5, d: 0.6 }, { f: A4, d: 0.6 }, { f: F4, d: 0.6 }, { f: E4, d: 0.6 }, { f: D4, d: 0.8 },
      { f: B4, d: 0.4 }, { f: B4, d: 0.2 }, { f: A4, d: 0.6 }, { f: F4, d: 0.6 }, { f: G4, d: 0.6 }, { f: F4, d: 1.2 }
    ],
    // Track 1: Celestial Star Chimes
    [
      { f: C5, d: 0.5 }, { f: E4, d: 0.5 }, { f: G4, d: 0.5 }, { f: C5, d: 0.8 },
      { f: A4, d: 0.5 }, { f: F4, d: 0.5 }, { f: D4, d: 0.5 }, { f: G4, d: 0.8 }
    ],
    // Track 2: Upbeat Celebration Waltz
    [
      { f: C4, d: 0.3 }, { f: E4, d: 0.3 }, { f: G4, d: 0.3 }, { f: C5, d: 0.5 },
      { f: G4, d: 0.3 }, { f: E4, d: 0.3 }, { f: F4, d: 0.3 }, { f: A4, d: 0.5 }
    ],
    // Track 3: Crazy Party Beats Remix
    [
      { f: C4 * 2, d: 0.2 }, { f: G4 * 2, d: 0.2 }, { f: C5 * 2, d: 0.2 }, { f: E4 * 2, d: 0.2 },
      { f: F4 * 2, d: 0.2 }, { f: A4 * 2, d: 0.2 }, { f: G4 * 2, d: 0.3 }
    ]
  ];

  const currentNotes = tracks[selectedTrack] || tracks[0];
  let noteIndex = 0;

  function playNextNote() {
    if (!isMusicPlaying) return;
    const note = currentNotes[noteIndex];
    if (note) {
      playSynthNote(note.f, note.d);
    }
    noteIndex = (noteIndex + 1) % currentNotes.length;
    const nextDuration = (note ? note.d : 0.5) * 1000 + 60;
    melodyInterval = setTimeout(playNextNote, nextDuration);
  }

  playNextNote();
}

function stopMelody() {
  if (melodyInterval) {
    clearTimeout(melodyInterval);
    melodyInterval = null;
  }
}

function playSynthNote(freq, duration) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = selectedTrack === 3 ? 'sawtooth' : 'sine';
  osc.frequency.setValueAtTime(freq, ctx.currentTime);

  gain.gain.setValueAtTime(0.01, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration + 0.05);
}

function playChimeSound(freq = 600) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.4);
}

function playPopSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.1);
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.1);
}

function playPartyHornFX() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(320, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(540, ctx.currentTime + 0.3);
  gain.gain.setValueAtTime(0.25, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.4);
}

function playVictoryFanfare() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((freq, idx) => {
    setTimeout(() => {
      playChimeSound(freq);
    }, idx * 120);
  });
}

function playCandleChime() {
  playVictoryFanfare();
}

/* ==========================================================================
   15. CLOSING ACTIONS & TOAST
   ========================================================================== */
function initClosingActions() {
  const confettiShowerBtn = document.getElementById('confettiShowerBtn');
  const sendWarmHeartsBtn = document.getElementById('sendWarmHeartsBtn');
  const replaySurpriseBtn = document.getElementById('replaySurpriseBtn');

  if (confettiShowerBtn) {
    confettiShowerBtn.addEventListener('click', () => {
      fireCornerConfettiCannons();
      launchFireworks();
      playChimeSound(700);
      showToast('🎉 Confetti Shower for Anjali! 💖');
    });
  }

  if (sendWarmHeartsBtn) {
    sendWarmHeartsBtn.addEventListener('click', () => {
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          launchFireworks();
        }, i * 150);
      }
      playVictoryFanfare();
      showToast('💖 Warmest wishes & love sent to Anjali! 🌸');
    });
  }

  if (replaySurpriseBtn) {
    replaySurpriseBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showToast('↺ Ready to celebrate all over again!');
    });
  }
}

let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById('toastNotification');
  const toastText = document.getElementById('toastText');
  if (!toast || !toastText) return;

  toastText.textContent = msg;
  toast.classList.add('show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}
