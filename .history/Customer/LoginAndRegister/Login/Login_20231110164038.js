document.getElementById('loginForm').addEventListener('submit', async function (event) {
event.preventDefault();

const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

// Validation
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

emailError.textContent = '';
passwordError.textContent = '';

if (!email) {
  emailError.textContent = 'Email is required';
  return;
}

// Basic email format validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  emailError.textContent = 'Invalid email format';
  return;
}

if (!password) {
  passwordError.textContent = 'Password is required';
  return;
}

const apiUrl = 'https://your-api-endpoint/login'; // Replace with your actual login API endpoint

try {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  console.log('Login successful:', data);

  // Redirect or perform further actions upon successful login
} catch (error) {
  console.error('Error:', error);
  // Display an error message to the user or perform other error handling
}
});