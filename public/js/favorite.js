document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  // Use event delegation to handle clicks on the heart icon
  document.body.addEventListener('click', async (event) => {
    // Find the closest heart icon element
    const heartIcon = event.target.closest('.fa-heart');

    if (heartIcon) {
      console.log('Heart icon clicked');

      // Prevent the default action for the click event
      event.preventDefault();

      // Find the closest parent element with the data-game-id attribute
      const parentElement = heartIcon.closest('[data-game-id]');
      const gameId = parentElement ? parentElement.dataset.gameId : null;
      
      console.log(`Game ID: ${gameId}`);

      if (!gameId) {
        console.warn('No game ID found for heart icon.');
        return;
      }

      try {
        // Check session status
        const sessionResponse = await fetch('/api/check-session', { method: 'GET' });
        const { logged_in } = await sessionResponse.json();
        console.log(`Logged in status: ${logged_in}`);

        if (!logged_in) {
          console.log('User is not logged in, redirecting to login');
          window.location.href = '/login';
          return;
        }

        // Post favorite data
        const favoriteResponse = await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ game_id: gameId }),
        });

        if (favoriteResponse.ok) {
          console.log('Added to favorites successfully');
          alert('Added to favorites!');
        } else {
          const errorData = await favoriteResponse.json();
          console.error('Failed to add to favorites:', errorData);
          alert(`Failed to add to favorites: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error during favorite addition:', error);
        alert('An error occurred while adding to favorites.');
      }
    }
  });
});