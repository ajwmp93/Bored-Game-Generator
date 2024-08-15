  document.addEventListener('DOMContentLoaded', () => {
    const heartIcon = document.querySelector('.fa-heart');

    if (heartIcon) {
      heartIcon.addEventListener('click', async () => {
        console.log('button clicked')
        const response = await fetch('/api/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // Assuming you have some identifiers for your content
            title: '{{title}}',
            img_url: '{{img_url}}',
            site_url: '{{site_url}}',
            description: '{{description}}',
          }),
        });

        if (response.ok) {
          alert('Liked!');
        } else {
          alert('Failed to like.');
        }
      });
    }
  });