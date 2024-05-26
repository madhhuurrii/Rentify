// const form = document.getElementById("reg-form");
// form.addEventListener("submit", regUser);

// async function regUser(event) {
//     // mode: 'no-cors',
//     event.preventDefault();
//     const firstname = document.getElementById("firstname").value;
//     const lastname = document.getElementById("lastname").value;
//     const email = document.getElementById("email").value;
//     const mobile = document.getElementById("mobile").value;
//     const password = document.getElementById("password").value;
//     // const confirm = document.getElementById("confirm").value;
//    console.log(firstname);
//     const result = await fetch('/api/register', {
//         method: "POST",
//         headers: {
//             "Access-Control-Allow-Origin": "*",
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             firstname,
//             lastname,
//             email,
//             mobile,
//             password,
//         }),

//     }).then((res) => res.json())
//     .catch(e => {
//         console.log(e)
//       })
//     // console.log(result)
//     if (result.ok) {
//         alert("Registration Successful!");

//         window.redirect("/login");
//     } else {
//         alert(result.error);
//     }
// }

const form = document.getElementById('reg-form');
const errorMessage = document.getElementById('error-message');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const firstname = document.getElementById("firstname").value;
      const lastname = document.getElementById("lastname").value;
      const email = document.getElementById("email").value;
      const mobile = document.getElementById("mobile").value;
      var e = document.getElementById('profile');
      var profile = e.options[e.selectedIndex].value;
      const password = document.getElementById("password").value;
      console.log(profile)
  const response = await fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({  firstname,
                    lastname,
                    email,
                    mobile,
                    profile,
                    password, }),
    credentials: 'include' ,
  });
  console.log(response.status)
  if (response.status=='error') {
    errorMessage.textContent = 'Failed to add data';
    
    window.alert('user Exist!')
  }
  else{
    window.location.href = '/login';
  }
});