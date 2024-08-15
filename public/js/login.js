// Function to handle login form submission
const loginFormHandler = async (event) => {
  event.preventDefault();


  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {

    showLoading(true);

    try {

      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        if (result.redirect) {
          document.location.replace(result.redirect); // Redirect to /favorites or another URL specified by the server
        } else {
          showNotification('Login successful but no redirect URL provided.');
        }
      } else {
        const errorData = await response.json();
        showNotification(`Login failed: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      showNotification('An error occurred while logging in.');
    } finally {
      showLoading(false);
    }
  } else {
    showNotification('Please fill in both email and password.');
  }
};


const signupFormHandler = async (event) => {
  event.preventDefault();


  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {

    showLoading(true);

    try {

      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {

        document.location.replace('/profile');
      } else {
        const errorData = await response.json();
        showNotification(`Signup failed: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      showNotification('An error occurred while signing up.');
    } finally {
      showLoading(false);
    }
  } else {
    showNotification('Please fill in all fields.');
  }
};

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerText = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 5000); 
}


function showLoading(isLoading) {
  const loadingIndicator = document.querySelector('.loading-indicator');
  if (loadingIndicator) {
    loadingIndicator.style.display = isLoading ? 'block' : 'none';
  }
}


document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);