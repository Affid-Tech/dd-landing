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
        const formattedDate = new Date(nextGame.date).toLocaleDateString('ru-RU', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

        container.innerHTML = `
        <sl-card class="game-card" style="margin-top: 1rem;">
            <strong slot="header">🎲 ${nextGame.title}</strong>
            <div>
            <p>🧙 Мастер: <strong>${nextGame.dm}</strong></p>
            <p>🗓 Время: <strong>${formattedDate}</strong></p>
            <p>👥 Игроков: <strong>${nextGame.currentPlayers} / ${nextGame.maxPlayers}</strong></p>
            <p>🕓 Длительность: <strong>${nextGame.duration} ч.</strong></p>
            <p class="game-description">${nextGame.description}</p>
            </div>
        </sl-card>
        `;
    } catch (error) {
      container.innerHTML = "<p>⚠️ Ошибка загрузки расписания.</p>";
      console.error("Ошибка загрузки игры:", error);
    }
  };
  