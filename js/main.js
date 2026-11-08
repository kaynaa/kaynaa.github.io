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
