// classes

class Budget {
  constructor(budget) {
    this.budget = Number(budget);
    this.budgetLeft = this.budget;
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
      console.log("valid");
    }
  });
}
