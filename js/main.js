/* ── Nav: scroll border + mobile toggle ── */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}`
          ? 'var(--text)'
          : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

/* ── Fade-in on scroll ── */
const fadeEls = document.querySelectorAll(
  '.timeline__card, .research__card, .project__card, .pub__item, .about__text, .about__skills'
);

fadeEls.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => fadeObserver.observe(el));

/* ── Beyond the Classroom card stack ── */

document.addEventListener('DOMContentLoaded', () => {
  (function () {
    const cards = [...document.querySelectorAll('.flashcard')];
    if (!cards.length) return;

    let topIndex = 0;

    function updateStack() {
      const total = cards.length;
      cards.forEach((card, i) => {
        const pos = (i - topIndex + total) % total;
        card.setAttribute('data-pos', Math.min(pos, 5));
        if (pos !== 0) card.classList.remove('flipped');
      });

      const counter = document.getElementById('beyondCounter');
      if (counter) counter.textContent = `${topIndex + 1} / ${cards.length}`;
    }

    cards.forEach(card => {
      card.addEventListener('click', () => {
        if (card.getAttribute('data-pos') === '0') {
          card.classList.toggle('flipped');
        }
      });
    });

    document.getElementById('beyondNext')?.addEventListener('click', () => {
      cards[topIndex].classList.remove('flipped');
      topIndex = (topIndex + 1) % cards.length;
      updateStack();
    });

    document.getElementById('beyondPrev')?.addEventListener('click', () => {
      cards[topIndex].classList.remove('flipped');
      topIndex = (topIndex - 1 + cards.length) % cards.length;
      updateStack();
    });

    updateStack();
  })();
});

// (function () {
//   const cards = [...document.querySelectorAll('.flashcard')];
//   if (!cards.length) return;
//   let topIndex = 0;

//   function updateStack() {
//     const total = cards.length;
//     cards.forEach((card, i) => {
//       const pos = (i - topIndex + total) % total;
//       card.setAttribute('data-pos', Math.min(pos, 5));
//       if (pos !== 0) card.classList.remove('flipped');
//     });
//     const counter = document.getElementById('beyondCounter');
//     if (counter) counter.textContent = `${topIndex + 1} / ${cards.length}`;
//   }

//   cards.forEach(card => {
//     card.addEventListener('click', () => {
//       if (card.getAttribute('data-pos') === '0') card.classList.toggle('flipped');
//     });
//   });

//   document.getElementById('beyondNext')?.addEventListener('click', () => {
//     cards[topIndex].classList.remove('flipped');
//     topIndex = (topIndex + 1) % cards.length;
//     updateStack();
//   });

//   document.getElementById('beyondPrev')?.addEventListener('click', () => {
//     cards[topIndex].classList.remove('flipped');
//     topIndex = (topIndex - 1 + cards.length) % cards.length;
//     updateStack();
//   });

//   updateStack();
// })();

/* ── Contact form (client-side only — wire to a backend/Formspree) ── */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sent!';
    btn.disabled = true;
    btn.style.background = 'var(--success)';
    btn.style.borderColor = 'var(--success)';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      btn.style.background = '';
      btn.style.borderColor = '';
      form.reset();
    }, 3000);
  });
}