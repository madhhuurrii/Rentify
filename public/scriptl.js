const form = document.getElementById('reg-form');
const errorMessage = document.getElementById('error-message');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
 
      const email = document.getElementById("email").value;
      var e = document.getElementById('profile');
      var profile = e.options[e.selectedIndex].value;
      const password = document.getElementById("password").value;
      console.log(email)
  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({  
                    email,
                    profile,
                    password, }),
    credentials: "include",
  });
  console.log(response.status)
  if (response.status=='error') {
    errorMessage.textContent = 'Failed to add data';
    
    window.alert('user Exist!')
  }
  else{
    window.location.href = '/';
  }
});