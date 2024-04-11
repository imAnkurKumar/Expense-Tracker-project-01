document.addEventListener("DOMContentLoaded", async () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");
  let token;

  try {
    token = localStorage.getItem("token");
    console.log("token", token);
    if (!token) {
      console.error("token is missing");
    } else {
      const response = await axios.get(
        "http://localhost:4000/expense/getAllExpenses",
        {
          headers: { Authorization: token },
        }
      );
      const expenses = response.data;
      expenses.forEach((expense) => {
        const expenseItem = createExpenseItem(expense);
        expenseList.appendChild(expenseItem);
      });
    }
  } catch (err) {
    console.log(err);
  }

  expenseForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const amount = document.getElementById("amount").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;

    try {
      const response = await axios.post(
        "http://localhost:4000/expense/addExpenses",
        {
          amount,
          description,
          category,
        },
        { headers: { Authorization: token } }
      );
      if (response.status === 200) {
        const newExpense = { amount, description, category };
        const expenseItem = createExpenseItem(newExpense);
        expenseList.appendChild(expenseItem);

        alert("Expense added successfully");
      }
    } catch (error) {
      console.error("Expense addition error:", error);
      alert("Error adding expense");
    }
  });
  expenseList.addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete-button")) {
      const expenseItem = e.target.parentElement;
      const expenseId = expenseItem.dataset.expenseId;

      try {
        await axios.delete(
          `http://localhost:4000/expense/deleteExpense/${expenseId}`,
          { headers: { Authorization: token } }
        );
        expenseItem.remove();
        alert("Expense deleted successfully");
      } catch (error) {
        console.error("Error deleting expense:", error);
        alert("Error deleting expense");
      }
    }
  });

  function createExpenseItem(expense) {
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense-item");
    expenseItem.dataset.expenseId = expense.id;
    expenseItem.innerHTML = `
    <span class="amount">Rs ${expense.amount}</span>
    <span class="category">${expense.category}</span>
    <p class="description">${expense.description}</p>
    <button class="delete-button">Delete</button>
  `;
    return expenseItem;
  }
});
