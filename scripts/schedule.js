window.loadNextGame = async function () {
    const container = document.getElementById("next-game");
    if (!container) return;
  
    try {
      const response = await fetch("https://raw.githubusercontent.com/Affid-Tech/dnd-schedule/refs/heads/main/data/games.json");
      const games = await response.json();
  
      const now = new Date();
      const futureGames = games
        .filter(game => {
          const date = new Date(game.date);
          return !isNaN(date) && date > now;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));
  
      if (futureGames.length === 0) {
        container.style.display = "none";
        return;
      }
  
      const nextGame = futureGames[0];
      const date = new Date(nextGame.date);
  
      container.innerHTML = `
        <h3>🎲 Ближайшая игра</h3>
        <p><strong>${nextGame.title}</strong> от мастера ${nextGame.dm}</p>
        <p>🗓 ${date.toLocaleDateString('ru-RU', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}</p>
        <p>👥 Игроков: ${nextGame.currentPlayers}/${nextGame.maxPlayers}</p>
        <p>🕓 Длительность: ${nextGame.duration} ч.</p>
        <p>${nextGame.description}</p>
      `;
    } catch (error) {
      container.innerHTML = "<p>⚠️ Ошибка загрузки расписания.</p>";
      console.error("Ошибка загрузки игры:", error);
    }
  };
  