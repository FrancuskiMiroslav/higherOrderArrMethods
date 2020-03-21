const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1500000)
  };

  addData(newUser);
}

// Double everyones money
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });

  updateDom();
}

// sort users by richest
function sortDescending() {
  data.sort((a, b) => b.money - a.money);

  updateDom();
}

// filter only millionaires
function filterMillionaires() {
  data = data.filter(item => {
    return item.money >= 1000000;
  });

  updateDom();
}

// calculate everyones wealth with reduce
function calculateEveryonesWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3> Total wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
  main.appendChild(wealthEl);
}

// Add new obj to data arr
function addData(obj) {
  data.push(obj);

  updateDom();
}

// update DOM
function updateDom(providedData = data) {
  // clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach(person => {
    const element = document.createElement("div");
    element.classList.add("person");

    element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(person.money)}`;
    main.appendChild(element);
  });
}

// Format number to money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return "€ " + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortDescending);
showMillionairesBtn.addEventListener("click", filterMillionaires);
calculateWealthBtn.addEventListener("click", calculateEveryonesWealth);
