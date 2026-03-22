/* ── Mobile Menu ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
}
function closeMob() {
  if (hamburger) hamburger.classList.remove('open');
  if (mobileMenu) mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── Scroll Progress & Nav & Sticky CTA ── */
const progressBar = document.getElementById('progressBar');
const scrollTopBtn = document.getElementById('scrollTop');
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  if (progressBar) progressBar.style.transform = `scaleX(${scrolled / total})`;
  if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', scrolled > 400);
  if (nav) nav.classList.toggle('scrolled', scrolled > 20);
  const stickyCta = document.getElementById('stickyCta');
  if (stickyCta) stickyCta.classList.toggle('visible', scrolled > 600);
});

/* ── Reveal on Scroll ── */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ── Counter Animation ── */
const counters = document.querySelectorAll('[data-target]');
const cIO = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.target;
    let start = 0;
    const step = target / 50;
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      el.textContent = Math.floor(start) + '+';
      if (start >= target) clearInterval(timer);
    }, 28);
    cIO.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => cIO.observe(c));

/* ── Contact Form → API + WhatsApp ── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const fname = document.getElementById('fname')?.value || '';
    const lname = document.getElementById('lname')?.value || '';
    const phone = document.getElementById('phone')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const message = document.getElementById('message')?.value || '';

    // Save to DB + send email notification
    try {
      await fetch('http://localhost:3002/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fname, lname, phone, email, message })
      });
    } catch (err) {
      console.error('API error:', err);
    }

    // Send to Eran's WhatsApp
    const waText = `📩 פנייה חדשה מהאתר:
━━━━━━━━━━━━━━━━
👤 שם: ${fname} ${lname}
📱 טלפון: ${phone}
📧 אימייל: ${email}
━━━━━━━━━━━━━━━━
💬 הודעה:
${message}`;

    window.open(`https://wa.me/9720522611850?text=${encodeURIComponent(waText)}`, '_blank');
    contactForm.style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
  });
}

/* ── Generic Modal System ── */
function openModal(id, content) {
  const existing = document.getElementById(id);
  if (existing) existing.remove();
  const modal = document.createElement('div');
  modal.id = id;
  modal.className = 'modal-overlay';
  modal.innerHTML = `<div class="modal-content"><button class="modal-close" aria-label="סגור">&times;</button>${content}</div>`;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => modal.classList.add('active'));
  modal.querySelector('.modal-close').addEventListener('click', () => closeModalById(id));
  modal.addEventListener('click', e => { if (e.target === modal) closeModalById(id); });
  const escHandler = e => { if (e.key === 'Escape') { closeModalById(id); document.removeEventListener('keydown', escHandler); } };
  document.addEventListener('keydown', escHandler);
}
function closeModalById(id) {
  const modal = document.getElementById(id);
  if (modal) { modal.classList.remove('active'); document.body.style.overflow = ''; setTimeout(() => modal.remove(), 300); }
}

/* ── Practice Area Popup Modals ── */
const areaData = {
  'נזיקין כללי': { icon: '⚖️', desc: 'ייצוג נפגעי גוף בתביעות פיצויים בגין נזקי גוף מכל סוג — תאונות דרכים, תאונות עבודה, נפילות ברחוב ועוד.', points: ['תאונות דרכים ונזקי גוף', 'נפילות ברחוב ובמקום הציבורי', 'תאונות עבודה ומחלות מקצוע', 'פיצויים על כאב וסבל, אובדן שכר ונכות'], link: 'damages.html' },
  'רשלנות רפואית': { icon: '🩺', desc: 'תביעות כנגד בתי חולים, רופאים וגורמים רפואיים בגין טיפול רשלני שגרם לנזק.', points: ['אבחון שגוי או מאוחר', 'רשלנות בניתוח או בטיפול', 'חוסר במתן מידע והסכמה מדעת', 'נזק ליילוד ורשלנות בלידה'], link: 'medical-malpractice.html' },
  'ביטוח': { icon: '🛡️', desc: 'תביעות מול חברות ביטוח בנושאי נכות, תאונות ואובדן כושר עבודה.', points: ['תביעות אובדן כושר עבודה', 'ביטוח חיים ומחלות קשות', 'ביטוח תאונות אישיות', 'דחיית תביעת ביטוח'], link: 'insurance.html' },
  'תאונות עבודה': { icon: '🏗️', desc: 'מיצוי זכויות עובדים שנפגעו בתאונת עבודה מול ביטוח לאומי ומעסיקים.', points: ['הכרה בתאונת עבודה', 'קצבאות נכות מעבודה', 'תביעות נגד מעסיקים', 'ועדות רפואיות'], link: 'damages.html' },
  'תאונות דרכים': { icon: '🚗', desc: 'מיצוי פיצויים מחברות הביטוח לנפגעי תאונות דרכים — גם בתיקים מורכבים.', points: ['נפגעי גוף בתאונות דרכים', 'תביעות לפי חוק הפיצויים', 'ייצוג מול חברות ביטוח', 'תאונות קטלניות'], link: 'damages.html' },
  'תאונות ימיות': { icon: '⚓', desc: 'מומחיות ייחודית בתביעות נפגעים בים — מדריכים, חובבים, עובדים ימיים.', points: ['תאונות ספורט ימי', 'פגיעות בחופי רחצה', 'תאונות צלילה וגלישה', 'אחריות מפעילי פעילות ימית'], link: 'marine-accidents.html' },
  'תאונות תלמידים': { icon: '🎒', desc: 'ייצוג ילדים ומשפחותיהם שנפגעו בתאונות בבית הספר או בפעילויות חינוכיות.', points: ['פגיעות בשטח בית הספר', 'טיולים ופעילויות חוץ', 'ביטוח תלמידים', 'אחריות מוסדות חינוך'], link: 'student-accidents.html' },
  'תאונות קטלניות': { icon: '🚑', desc: 'ייצוג משפחות שכולות בתאונות שגרמו לאובדן חיים.', points: ['תביעות תלויים', 'פיצוי על אובדן חיים', 'ייצוג משפחות שכולות', 'חקירת נסיבות המוות'], link: 'damages.html' },
  'מחלות מקצוע': { icon: '🫁', desc: 'הכרה במחלות שנגרמו עקב תנאי עבודה ומיצוי זכויות מביטוח לאומי.', points: ['מחלות ריאה תעסוקתיות', 'חשיפה לחומרים מסוכנים', 'לחץ ושחיקה בעבודה', 'ועדות רפואיות'], link: 'damages.html' },
  'פטור ממס הכנסה': { icon: '💰', desc: 'קבלת פטור ממס הכנסה על פיצויים ומענקים לנפגעים — חסכון כספי משמעותי.', points: ['פטור לנכי עבודה', 'פטור לנכי תאונות דרכים', 'ערעור על החלטות', 'חישוב הטבות מס'], link: 'tax-exemption.html' },
  'צוואות וירושות': { icon: '📋', desc: 'עריכת צוואות, ניהול עיזבונות וייצוג בסכסוכי ירושה.', points: ['עריכת צוואה', 'קיום צוואה', 'סכסוכי ירושה', 'ניהול עיזבונות'], link: 'wills.html' },
  'ייפוי כוח מתמשך': { icon: '📜', desc: 'ליווי משפטי מלא בהכנת מסמכים וניהול הליכים בנושאי כשרות משפטית.', points: ['ייפוי כוח מתמשך', 'צווי אפוטרופסות', 'הנחיות רפואיות מקדימות', 'הגנה על הזכויות שלכם'], link: 'power-of-attorney.html' },
  'חקירת סיבות מוות': { icon: '🔍', desc: 'ייצוג משפחות בהליכי חקירת סיבות מוות בפני השופט החוקר.', points: ['חקירות בפני שופט חוקר', 'בירור נסיבות מוות', 'ייצוג משפחות', 'הליכים לפי חוק חקירת סיבות מוות'], link: 'causes-of-death.html' },
  'נכות כללית וניידות': { icon: '♿', desc: 'ייצוג מול ועדות רפואיות לקביעת נכות ומיצוי קצבאות ניידות.', points: ['ועדות רפואיות', 'קצבת ניידות', 'נכות כללית', 'ערעורים על החלטות'], link: 'damages.html' },
  'נכי צה"ל': { icon: '🎖️', desc: 'ייצוג חיילים ומשוחררים מול משרד הביטחון לקביעת נכות ומיצוי קצבאות.', points: ['תביעות למשרד הביטחון', 'ועדות רפואיות צבאיות', 'קצבאות ומענקים', 'הכרה בנכות'], link: 'damages.html' }
};

document.querySelectorAll('.area-card').forEach(card => {
  card.addEventListener('click', function(e) {
    e.preventDefault();
    const label = this.querySelector('.area-label')?.textContent?.trim();
    const data = areaData[label];
    if (!data) { window.location.href = this.href; return; }
    openModal('areaModal', `
      <div class="modal-icon">${data.icon}</div>
      <h3 class="modal-title">${label}</h3>
      <p class="modal-desc">${data.desc}</p>
      <ul class="modal-points">${data.points.map(p => `<li>${p}</li>`).join('')}</ul>
      <div class="modal-actions">
        <a href="${data.link}" class="btn-teal">למידע המלא ←</a>
        <a href="https://wa.me/9720522611850?text=${encodeURIComponent('שלום, אני מעוניין/ת בייעוץ בנושא ' + label)}" target="_blank" rel="noopener" class="btn-outline-white modal-wa">💬 וואטסאפ</a>
      </div>
    `);
  });
});

/* ── Team Member Lightbox ── */
document.querySelectorAll('.attorney-card').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', function() {
    const name = this.querySelector('.attorney-name')?.textContent || '';
    const title = this.querySelector('.attorney-title')?.textContent || '';
    const bio = this.querySelector('.attorney-bio')?.innerHTML || '';
    const avatar = this.querySelector('.attorney-avatar')?.textContent?.trim() || '👤';
    const roles = this.querySelector('.attorney-roles')?.innerHTML || '';
    openModal('teamModal', `
      <div class="team-modal-header">
        <div class="team-modal-avatar">${avatar}</div>
        <div><h3 class="modal-title">${name}</h3><p class="team-modal-title">${title}</p></div>
      </div>
      <div class="team-modal-bio">${bio}</div>
      ${roles ? `<div class="team-modal-roles">${roles}</div>` : ''}
      <div class="modal-actions">
        <a href="tel:049001056" class="btn-teal">📞 04-9001056</a>
        <a href="https://wa.me/9720522611850" target="_blank" rel="noopener" class="btn-outline-white modal-wa">💬 וואטסאפ</a>
      </div>
    `);
  });
});

/* ── Accordion Sections ── */
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', function() {
    const item = this.parentElement;
    const isOpen = item.classList.contains('open');
    item.parentElement.querySelectorAll('.accordion-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ── Testimonials Carousel ── */
const testiTrack = document.querySelector('.testimonials-track');
if (testiTrack) {
  let currentSlide = 0;
  const slides = testiTrack.querySelectorAll('.testimonial-card');
  const totalSlides = slides.length;
  const dots = document.querySelectorAll('.testi-dot');
  function goToSlide(n) {
    currentSlide = n;
    testiTrack.style.transform = `translateX(${n * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === n));
  }
  document.querySelector('.testi-prev')?.addEventListener('click', () => goToSlide(currentSlide > 0 ? currentSlide - 1 : totalSlides - 1));
  document.querySelector('.testi-next')?.addEventListener('click', () => goToSlide(currentSlide < totalSlides - 1 ? currentSlide + 1 : 0));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));
  setInterval(() => goToSlide(currentSlide < totalSlides - 1 ? currentSlide + 1 : 0), 6000);
}

/* ── Page Load Transition ── */
document.addEventListener('DOMContentLoaded', () => document.body.classList.add('page-loaded'));
