window.initTestimonials = async function () {
    const grid = document.querySelector('.testimonials-grid');
    if (!grid) return;
  
    try {
      const response = await fetch('data/reviews.json');
      const reviews = await response.json();
  
      reviews.forEach(review => {
        const card = document.createElement('sl-card');
        card.classList.add('testimonial-card');
  
        const avatar = document.createElement('img');
        avatar.src = review.picture;
        avatar.alt = `Фото ${review.name}`;
        avatar.className = 'testimonial-avatar';
  
        const author = document.createElement('div');
        author.className = 'author';
        author.textContent = `— ${review.name}, ${review.dm ? 'мастер' : 'игрок'}`;
  
        const textBlock = document.createElement('div');
        textBlock.className = 'testimonial-text';
  
        review.content.forEach(line => {
          if (line.trim() === '') {
            const spacer = document.createElement('div');
            spacer.className = 'spacer';
            textBlock.appendChild(spacer);
          } else {
            const p = document.createElement('p');
            p.textContent = line;
            textBlock.appendChild(p);
          }
        });
  
        card.appendChild(avatar);
        card.appendChild(author);
        card.appendChild(textBlock);
  
        grid.appendChild(card);
      });
  
    } catch (error) {
      console.error('Не удалось загрузить отзывы:', error);
      grid.innerHTML = '<p class="error">Отзывы временно недоступны.</p>';
    }
  }
  