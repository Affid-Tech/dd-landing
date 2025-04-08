// main.js — модульная загрузка Shoelace и HTML-фрагментов

// ✅ Импортируем bundle с встроенным lit
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.13.0/cdn/shoelace.js';
import { registerIconLibrary } from 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.13.0/cdn/utilities/icon-library.js';
import DiceBox from 'https://cdn.skypack.dev/@3d-dice/dice-box';

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


window.addEventListener("DOMContentLoaded", () => {
  const interval = setInterval(() => {
    const heroSection = document.querySelector("#hero");
    if (heroSection) {
      clearInterval(interval);

      const observer = new MutationObserver((mutations, obs) => {
        const diceBoxDiv = document.getElementById("dice-box");
        const rollButton = document.getElementById("roll-button");

        if (diceBoxDiv && rollButton && !diceBoxDiv.dataset.initialized) {
          obs.disconnect();

          const diceBox = new DiceBox({
            selector: "#dice-box",
            assetPath: "https://cdn.jsdelivr.net/npm/@3d-dice/dice-box@1.1.3/src/assets",
            theme: "dark",
            gravity: 9.8,
            friction: 0.5,
            restitution: 0.7,
          });

          diceBox.init().then(() => {
            diceBoxDiv.dataset.initialized = "true";
            rollButton.addEventListener("click", () => {
              diceBox.roll([{ type: "d20" }]);
            });
          });
        }
      });

      observer.observe(heroSection, {
        childList: true,
        subtree: true,
      });
    }
  }, 100);
});