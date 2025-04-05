
// Импорт Shoelace UI
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.13.0/dist/shoelace.js';

// Автоматическая подгрузка всех фрагментов с data-include
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
