const signupFormHandler = async (event) => {
  debugger;
  //  prevent page from loading
  event.preventDefault();

  // gather user email and password
  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  console.log(name, email, password);

  if (name && email && password) {
    //  get user form database
    const response = await fetch('/api/users/signup', {
      // const response = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('signup error');
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
