// Theme toggle
(function () {
  const root = document.documentElement, btn = document.getElementById('themeBtn');
  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  if (saved) root.dataset.theme = saved;
  const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  const label = () => { btn.textContent = isDark() ? 'Light' : 'Dark'; };
  label();
  btn.addEventListener('click', () => {
    root.dataset.theme = isDark() ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
    label();
  });
})();

// Index-card deck
(function () {
  const cards = [...document.querySelectorAll('#deck .card')];
  let top = 0;
  const render = () => {
    cards.forEach((c, i) => {
      const pos = (i - top + cards.length) % cards.length;
      c.dataset.pos = Math.min(pos, 5);
      if (pos !== 0) c.classList.remove('flipped');
    });
    document.getElementById('count').textContent = `${top + 1} / ${cards.length}`;
  };
  cards.forEach(c => c.addEventListener('click', () => { if (c.dataset.pos === '0') c.classList.toggle('flipped'); }));
  document.getElementById('next').onclick = () => { top = (top + 1) % cards.length; render(); };
  document.getElementById('prev').onclick = () => { top = (top - 1 + cards.length) % cards.length; render(); };
  render();
})();
