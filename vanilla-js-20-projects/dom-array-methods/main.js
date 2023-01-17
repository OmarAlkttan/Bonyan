var users = [{name: "Omar Alktan", wealth: 500}, {name: "Alaa Mostafa", wealth: 333}];

const table = document.getElementById("table");
const tbody = document.getElementById("tbody");

const head = '<thead><tr id="head"><th>Person</th> <th>Wealth</th></tr></thead>';
const tail = '<tr id="tail"><td>Total Wealth:</td><td id="wealth">0.00</td></tr>';

const addUserButton = document.getElementById("add-user");
const doubleButton = document.getElementById("double-money");
const millionButton = document.getElementById("show-million");
const sortButton = document.getElementById("sort");
const sortArrow = document.getElementById("sort-arrow");

var toggle = true;

addUserButton.addEventListener('click', addUser);
doubleButton.addEventListener('click', doubleMoney);
millionButton.addEventListener('click', showMillionaires);
sortButton.addEventListener('click', toggleSort);

renderTable();

var tableLength = tbody.children.length;

// add user from api
async function addUser(){
  console.log("add user");
  let response = await fetch("https://randomuser.me/api");
  let json = await response.json();
  console.log(json);
  console.log(json["results"][0]);
  const userName = json["results"][0]["name"]["first"] + " " + json["results"][0]["name"]["last"]
  const money = (Math.random() * 2000000).toFixed(2);
  const user = {name: userName, wealth: money};

  users.push(user);
  renderTable();
}

// add user to ui
function renderUser(user){
  var row = table.insertRow(tableLength);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  cell1.innerHTML = user.name;
  cell2.innerHTML = user.wealth;
}

// calculate total wealth
function calculateWealth(){
  let total = 0;
  for(let user of users){
    console.log(user.wealth);
    total += parseFloat(user.wealth);
  }
  console.log("total: " + total);
  console.log(wealth.innerHTML);
  document.getElementById("wealth").innerHTML = total.toFixed(2);
  console.log(wealth.innerHTML)
}

// render table from user array
function renderTable(){
  let text = head + '<tbody id="tbody">';
  for(let user of users){
    text += `<tr><td>${user.name}</td><td>${user.wealth}</td></tr>`;
  }
  text = text + tail + '</tbody>';
  table.innerHTML = text;
  calculateWealth();
}

// double money
function doubleMoney(){
  users = users.map( user => {
    user.wealth = (user.wealth * 2);
    return user;
  });
  renderTable();
}

//show millionaires only
function showMillionaires(){
  users = users.filter(user => {
    return user.wealth > 1000000;
  })
  renderTable();
}

function toggleSort(){
  if(toggle){
    users = users.sort((user1, user2) => { return user2.wealth - user1.wealth});
    toggle = false;
    sortArrow.innerHTML = "↓"
  }else{
    users = users.sort((user1, user2) => { return user1.wealth - user2.wealth});
    toggle = true;
    sortArrow.innerHTML = "↑";
  }
  
  renderTable();
}