document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.querySelector('#logout');

  if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
      try {
        const response = await fetch('/api/users/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // Redirect to home or login page
          document.location.replace('/');
        } else {
          alert('Failed to log out.');
        }
      } catch (error) {
        console.error('Error logging out:', error);
        alert('An error occurred. Please try again.');
      }
    });
  }
});