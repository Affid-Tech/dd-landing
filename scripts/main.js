// main.js — модульная загрузка Shoelace и HTML-фрагментов
import './schedule.js';
import './reviews.js';

// ✅ Импортируем bundle с встроенным lit
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.13.0/cdn/shoelace.js';
import { registerIconLibrary } from 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.13.0/cdn/utilities/icon-library.js';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-include]').forEach(async (el) => {
    const file = el.getAttribute('data-include');
    const onLoadFnName = el.getAttribute('data-onload');

    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error(`Ошибка загрузки: ${file}`);
      el.innerHTML = await res.text();

      // Вызываем onLoad функцию, если указана
      if (onLoadFnName && typeof window[onLoadFnName] === 'function') {
        window[onLoadFnName](el); // можно передать сам элемент
      }
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