// classes

// variables
const addExpenseForm = document.getElementById("add-expense");
let budget, userBudget;

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
    }
  });

  // when user adds an expense
  addExpenseForm.addEventListener("submit", function(e) {
    e.preventDefault();
  });
}
