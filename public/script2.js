const form = document.getElementById('reg-form');
const errorMessage = document.getElementById('error-message');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const propname = document.getElementById("propname").value;
      const address = document.getElementById("address").value;
      const bedroom = document.getElementById("bedroom").value;
      const bathroom = document.getElementById("bathroom").value;
      const landmark = document.getElementById("landmark").value;
      const price = document.getElementById("price").value;
      const desc = document.getElementById("desc").value;
      const dd = document.getElementById("dd").value;
      const count = document.getElementById("count").value;
      console.log(dd)
  const response = await fetch('/up/'.concat(dd), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({  propname,
        address, 
        bedroom,
        bathroom,
        landmark,
        price,
        count,
        desc }),
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