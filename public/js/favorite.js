document.addEventListener('DOMContentLoaded', () => {
  const heartIcon = document.querySelector('.fa-heart');

  if (heartIcon) {
    heartIcon.addEventListener('click', async () => {
      // Check if user is logged in (you might use a global variable or local storage to check this)
      const response = await fetch('/api/check-session', { method: 'GET' });
      const { loggedIn } = await response.json();

      if (!loggedIn) {
        window.location.href = '/login';
        return;
      }

      // User is logged in, proceed to save favorite
      const gameId = heartIcon.dataset.gameId; // Ensure you have gameId available on the icon

      const favoriteResponse = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ game_id: gameId }),
      });

      if (favoriteResponse.ok) {
        alert('Added to favorites!');
      } else {
        alert('Failed to add to favorites.');
      }
    });
  }
});