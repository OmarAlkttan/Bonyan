const fetchButton = document.getElementById("fetch");
const swapButton = document.getElementById("swap-button");
const currencyFrom = document.getElementById("currency-from");
const currencyFromAmount = document.getElementById("currency-from-amount");
const currencyFromAmountShow = document.getElementById("currency-from-amount-show");
const currencyFromShow = document.getElementById("currency-from-show");
const currencyTo = document.getElementById("currency-to");
const currencyToAmount = document.getElementById("currency-to-amount");
const currencyToAmountShow = document.getElementById("currency-to-amount-show");
const currencyToShow = document.getElementById("currency-to-show");

var data;

async function start(){
  const currency = String(currencyFrom.value).toUpperCase();
  console.log("a7ten");
  let response = await fetch(`https://v6.exchangerate-api.com/v6/8777957a7d75e23d305581e4/latest/${currency}`);
  let json = await response.json();
  data= json;
  addCurrenciesToDropList();
  renderData();
}
start();



function renderData(){
  displayCurrencyFrom();
  displayCurrencyTo();
  calculateCurrencyAmountFrom();
  calculateCurrencyAmountTo();
}

// add currencies to drop list
function addCurrenciesToDropList(){
  const conversionRates = data["conversion_rates"];
  let currenciesFrom = "";
  let currenciesTo = "";
  for(let currency in conversionRates){
    currenciesFrom += `<option value="${currency}">${currency}</option>`;
    currenciesTo += `<option value="${currency}">${currency}</option>`;
  }
  currencyFrom.innerHTML = currenciesFrom;
  currencyTo.innerHTML = currenciesTo;
}

// fetch data from api
async function fetchExchangeData(){
  const currency = String(currencyFrom.value).toUpperCase();
  let response = await fetch(`https://v6.exchangerate-api.com/v6/8777957a7d75e23d305581e4/latest/${currency}`);
  let json = await response.json();
  data= json;
}


currencyFrom.addEventListener('change', changeCurrencyFrom);
currencyFromAmount.addEventListener('change', changeCurrencyAmountFrom);
currencyTo.addEventListener('change', changeCurrencyTo);
currencyToAmount.addEventListener('change', changeCurrencyAmountTo);

fetchButton.addEventListener('click', fetchExchangeData);

swapButton.addEventListener('click', swapCurrencies);

// change value of currency from
function changeCurrencyFrom(){
  fetchExchangeData();
}

// change value of currency to
function changeCurrencyTo(){
  calculateCurrencyAmountTo();
  displayCurrencyTo();
}

// change amount of currency from
function changeCurrencyAmountFrom(){
  calculateCurrencyAmountTo();
}

//change amount of currency to
function changeCurrencyAmountTo(){
  calculateCurrencyAmountFrom();
}

// display selected currency that you exchange from in middle
function displayCurrencyFrom(){
  currencyFromShow.innerHTML = String(currencyFrom.value).toUpperCase();
}

// display selected currency that you exchange to in middle
function displayCurrencyTo(){
  currencyToShow.innerHTML = String(currencyTo.value).toUpperCase();
}



// change amount of currency that we exchange to
function calculateCurrencyAmountTo(){
  const exchangeValue = data["conversion_rates"][currencyTo.value];
  const currencyToValue = currencyFromAmount.value * exchangeValue;
  currencyToAmount.value = currencyToValue.toFixed(2);
  currencyToAmountShow.innerHTML = currencyToValue;
  currencyFromAmountShow.innerHTML = currencyFromAmount.value;

  currencyFromAmount.style.width = `${(currencyFromAmount.value.length + 1) * 30}px`;
  currencyToAmount.style.width = `${(currencyToAmount.value.length + 1) * 30}px`;
}

// change amount of currency that we exchange from
function calculateCurrencyAmountFrom(){

  const exchangeValue = data["conversion_rates"][currencyTo.value];
  const currencyFromValue = currencyToAmount.value / exchangeValue;
  currencyFromAmount.value = currencyFromValue.toFixed(2);
  currencyFromAmountShow.innerHTML = currencyFromValue;
  currencyToAmountShow.innerHTML = currencyToAmount.value;
  currencyFromAmount.style.width = `${(currencyFromAmount.value.length + 1) * 30}px`;
  currencyToAmount.style.width = `${(currencyToAmount.value.length + 1) * 30}px`;
}

// swap currencies
async function swapCurrencies(){
  let temp = currencyFrom.value;
  currencyFrom.value = currencyTo.value;
  currencyTo.value = temp;
  currencyFromAmount.value = 1;
  await fetchExchangeData();
  displayCurrencyFrom();
  displayCurrencyTo();
  calculateCurrencyAmountTo();
}