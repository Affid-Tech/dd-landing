// main.js — модульная загрузка Shoelace и HTML-фрагментов

// ✅ Импортируем bundle с встроенным lit
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.13.0/cdn/shoelace.js';
import { registerIconLibrary } from '/dist/utilities/icon-library.js';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-include]').forEach(async (el) => {
    const file = el.getAttribute('data-include');
    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error(`Ошибка загрузки: ${file}`);
      el.innerHTML = await res.text();
    } catch (err) {
      el.innerHTML = `<p style="color: red;">Не удалось загрузить ${file}</p>`;
      console.error(err);
    }
  });
});


  registerIconLibrary('dnd-icons', {
    resolver: name => `assets/icons/${name}.svg`,
    mutator: svg => svg.setAttribute('fill', 'currentColor')
  });