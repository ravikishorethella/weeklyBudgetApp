// classes

class Budget {
  constructor(budget) {
    this.budget = Number(budget);
    this.budgetLeft = this.budget;
  }
  //   subtracts from the budget
  substractFromBudget(amount) {
    return (this.budgetLeft -= amount);
  }
}

// html content

class HTML {
  insertBudget(amount) {
    budgetTotal.innerHTML = `${amount}`;
    budgetLeft.innerHTML = `${amount}`;
  }
  //   error message
  printMessage(message, className) {
    const messageWrapper = document.createElement("div");
    messageWrapper.classList.add("text-center", "alert", className);
    messageWrapper.appendChild(document.createTextNode(message));

    // inserting the message above the form
    document
      .querySelector(".primary")
      .insertBefore(messageWrapper, addExpenseForm);

    //   clearing the error message
    setTimeout(() => {
      document.querySelector(".primary .alert").remove();
      addExpenseForm.reset();
    }, 3000);
  }

  //   adding expenses to the list
  addExpenseToList(name, amount) {
    const expensesList = document.querySelector("#expenses ul");

    //   creating a li
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
    ${name}
    <span class="badge badge-primary badge-pill">$ ${amount}</span>
`;

    // inserting into the html
    expensesList.appendChild(li);
  }
  //   subtract the expenses from the budget
  trackBudget(amount) {
    const budgetLeftDollars = budget.substractFromBudget(amount);
    budgetLeft.innerHTML = `${budgetLeftDollars}`;

    // change the color based on the budget left
    if (budget.budget / 4 > budgetLeftDollars) {
      // add classes to notify
      budgetLeft.parentElement.parentElement.classList.remove(
        "alert-success",
        "alert-warning"
      );
      budgetLeft.parentElement.parentElement.classList.add("alert-danger");
    } else if (budget.budget / 4 > budgetLeftDollars) {
      budgetLeft.parentElement.parentElement.classList.remove("alert-success");
      budgetLeft.parentElement.parentElement.classList.add("alert-warning");
    }
  }
}

// variables
const addExpenseForm = document.getElementById("add-expense"),
  budgetTotal = document.querySelector("span#total"),
  budgetLeft = document.querySelector("span#left");
let budget, userBudget;

const html = new HTML();

// event listeners
eventListeners();

function eventListeners() {
  // on page load
  document.addEventListener("DOMContentLoaded", function() {
    //   asking the user for his week budget
    userBudget = prompt("What is your budget for this week?");

    // validate the userBudget
    if (userBudget === null || userBudget === "" || userBudget === "0") {
      window.location.reload();
    } else {
      budget = new Budget(userBudget);

      //   html class instantiation
      html.insertBudget(budget.budget);
    }
  });

  // when user adds an expense
  addExpenseForm.addEventListener("submit", function(e) {
    e.preventDefault();
    //   reading the values from the form
    const expenseName = document.getElementById("expense").value;
    const amount = document.getElementById("amount").value;
    if (expenseName === "" || amount === "") {
      html.printMessage("All the fields are mandatory", "alert-danger");
    } else {
      html.addExpenseToList(expenseName, amount);
      html.trackBudget(amount);
      html.printMessage("Added ...", "alert-success");
    }
  });
}
