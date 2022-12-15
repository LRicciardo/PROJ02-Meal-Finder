const loginFormHandler = async (event) => {
  debugger
  //  prevent page from loading
  event.preventDefault();

  // gather user email and password
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  console.log(email, password)

  if (email && password) {
    //  get user form database
    const response = await fetch('/api/users/login', {
    // const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response)
    if (response.ok) {
      document.location.replace('/');
    } else {
      document.location.replace('/signup');

    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
