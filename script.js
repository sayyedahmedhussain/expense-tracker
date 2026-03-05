// getting elements from HTML
const form = document.getElementById("transaction-form");
const title = document.getElementById("title");
const amount = document.getElementById("amount");
const type = document.getElementById("type");
const date = document.getElementById("date");

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("transaction-list");


// getting saved transactions from localStorage
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];


// function to save data in localStorage
function saveData() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}


// when form is submitted
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const newTransaction = {
    id: Date.now(),
    title: title.value,
    amount: Number(amount.value),
    type: type.value,
    date: date.value
  };

  transactions.push(newTransaction);

  saveData();
  showTransactions();
  updateBalance();

  form.reset();
});


// show all transactions in list
function showTransactions() {

  list.innerHTML = "";

  transactions.forEach(function (item) {

    const li = document.createElement("li");

    const formattedDate = new Date(item.date).toLocaleDateString();

    li.innerHTML = `
      <span>${item.title} - Rs ${item.amount} (${formattedDate})</span>
      <button onclick="removeTransaction(${item.id})">X</button>
    `;

    list.appendChild(li);

  });

}


// delete transaction
function removeTransaction(id) {

  transactions = transactions.filter(function (item) {
    return item.id !== id;
  });

  saveData();
  showTransactions();
  updateBalance();
}


// calculate income, expense and balance
function updateBalance() {

  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach(function (item) {

    if (item.type === "income") {
      totalIncome += item.amount;
    } else {
      totalExpense += item.amount;
    }

  });

  const totalBalance = totalIncome - totalExpense;

  income.textContent = "Rs " + totalIncome;
  expense.textContent = "Rs " + totalExpense;
  balance.textContent = "Rs " + totalBalance;
}


// run when page loads
showTransactions();
updateBalance();