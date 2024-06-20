



async function findUser(username) {

  let rawData = await fetch("/find", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username })
  })
  let users = await rawData.json();
  return users;
}

async function renderProfile() {
  let data = await axios(url, {
    method: 'GET',
  });
}




const inputVal = document.querySelector(".input-box");

const btn = document.querySelector(".list-btn");
btn.addEventListener('click', async () => {
  let username = inputVal.value;
  inputVal.value = "";
  let users = await findUser(username);
  if (users.length === 0) {
    alert("User not found");
    return;
  }
  let list = document.querySelector(".userlist");
  list.innerHTML = "";
  users.map((user) => {
    let item = document.createElement('a');
    item.classList.add("profile-link")
    item.innerText = `${user.username}`;
    item.href = `/profile/${user._id}/view`;
    list.appendChild(item);
    item.addEventListener('click', renderProfile);

  })

})















