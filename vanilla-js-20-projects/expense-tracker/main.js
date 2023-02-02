
const NameInput = document.getElementById("text");
const AmountInput = document.getElementById("amount");
let history = document.getElementById("history");
const balanceView = document.getElementById("balance");
const incomeView = document.getElementById("income");
const expenseView = document.getElementById("expense");
const addTransactionButton = document.getElementById("add-transaction");

const transactions = JSON.parse(localStorage.getItem("transactions"))??[];
initialize();

function initialize(){
  displayTransactions();
  calculateBalance();
  calculateExpense();
  calculateIncome();
}



addTransactionButton.addEventListener('click' , ()=>{
  console.log(NameInput.value);
  console.log(AmountInput.value);
  if(!NameInput.value.trim() == "" && !AmountInput.value == "" && !AmountInput.value == 0){
    const transaction = {"name": NameInput.value, "amount": AmountInput.value};
    transactions.push(transaction);
    displayTransactions();
    NameInput.value = "";
    AmountInput.value = "";
    calculateBalance();
    calculateIncome();
    calculateExpense();
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }
})

function calculateBalance(){
  const total = transactions.reduce((total, transaction)=>{
    return total + parseInt(transaction.amount);
  }, 0);
  balanceView.innerHTML = `$${total}`;
}

function calculateIncome(){
  const total = transactions.filter((transaction)=>{
    return parseInt(transaction.amount) > 0;
  }).reduce((total, transaction)=>{
    return total + parseInt(transaction.amount);
  }, 0);
  incomeView.innerHTML = `$${total}`;
}

function calculateExpense(){
  const total = transactions.filter((transaction)=>{
    return parseInt(transaction.amount) < 0;
  }).reduce((total, transaction)=>{
    return total + parseInt(transaction.amount);
  }, 0);
  expenseView.innerHTML = `$${total * -1}`;
}

function displayDelete(item){
  item.children[0].style.display = "block"
}

function hideDelete(item){
  item.children[0].style.display = "none";
}

function deleteItem(item){
  const index = item.parentElement.id.slice(5);
  transactions.splice(index, 1);
  displayTransactions();
  console.log(transactions);
  calculateBalance();
  calculateExpense();
  calculateIncome();
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function displayTransactions(){
  let inner = "";
  for(const transaction of transactions){
    const color = transaction.amount > 0 ? 'green' : 'red';
    inner += `<div id="item-${transactions.length -1}" class="history-item ${color}" onmouseover='displayDelete(this)' onmouseout='hideDelete(this)'><span class="material-symbols-outlined delete" onclick='deleteItem(this)'>
    close
    </span>${transaction.name} <span class="amount">${transaction.amount}</span></div>`;
  }
  history.innerHTML = inner;
}