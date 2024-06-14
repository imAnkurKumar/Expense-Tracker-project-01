document.addEventListener("DOMContentLoaded", async () => {
  const showDailyButton = document.getElementById("showDailyReport");
  const tbodyDaily = document.getElementById("tbodyDailyId");
  const tfootDaily = document.getElementById("tfootDailyId");

  const showWeeklyButton = document.getElementById("showWeeklyReport");
  const tbodyWeekly = document.getElementById("tbodyWeeklyId");
  const tfootWeekly = document.getElementById("tfootWeeklyId");

  const showMonthlyButton = document.getElementById("showMonthlyReport");
  const tbodyMonthly = document.getElementById("tbodyMonthlyId");
  const tfootMonthly = document.getElementById("tfootMonthlyId");

  const showYearlyButton = document.getElementById("showYearlyReport");
  const tbodyYearly = document.getElementById("tbodyId");
  const tfootYearly = document.getElementById("tfootYearlyId");

  showDailyButton.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const selectedDate = document.getElementById("date").value;
      let token = localStorage.getItem("token");
      let totalAmount = 0;
      const response = await axios.post(
        "http://13.201.3.39/reports/dailyReports",
        { date: selectedDate },
        { headers: { Authorization: token } }
      );
      tbodyDaily.innerHTML = "";

      // Update the table with the received data
      response.data.forEach((expense) => {
        totalAmount += expense.amount;
        const row = document.createElement("tr");
        row.innerHTML = `
         <td>${expense.category}</td>
         <td>${expense.description}</td>
         <td>${expense.amount}</td>
       `;
        tbodyDaily.appendChild(row);
      });

      // Update the total amount in the footer
      tfootDaily.innerHTML = `
       <tr>
         <td></td>
         <td>Total</td>
         <td id="dailyTotalAmount">${totalAmount}</td>
       </tr>
     `;
    } catch (err) {
      console.log("Getting errror>", err);
    }
  });

  showWeeklyButton.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const selectedWeek = document.getElementById("week").value;
      let token = localStorage.getItem("token");
      let totalAmount = 0;
      const response = await axios.post(
        "http://13.201.3.39/reports/weeklyReports",
        { week: selectedWeek },
        { headers: { Authorization: token } }
      );
      tbodyWeekly.innerHTML = "";

      // Update the table with the received data
      response.data.forEach((expense) => {
        totalAmount += expense.amount;
        const row = document.createElement("tr");
        row.innerHTML = `       
         <td>${expense.category}</td>
         <td>${expense.description}</td>
         <td>${expense.amount}</td>
       `;
        tbodyWeekly.appendChild(row);
      });

      // Update the total amount in the footer
      tfootWeekly.innerHTML = `
       <tr>
         <td></td>
         <td>Total</td>
         <td id="weeklyTotalAmount">${totalAmount}</td>
       </tr>
     `;
    } catch (err) {
      console.log("Getting error>", err);
    }
  });

  showMonthlyButton.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const selectedMonth = document.getElementById("month").value;
      let token = localStorage.getItem("token");
      const response = await axios.post(
        "http://13.201.3.39/reports/monthlyReports",
        { month: selectedMonth },
        { headers: { Authorization: token } }
      );
      // console.log(response.data);

      // Clear existing table data
      tbodyMonthly.innerHTML = "";

      // Update the table with the received data
      let totalAmount = 0;
      response.data.forEach((expense) => {
        totalAmount += expense.amount;
        const createdAt = new Date(expense.createdAt);
        const formattedDate = createdAt.toLocaleDateString();
        const formattedTime = createdAt.toLocaleTimeString();
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${formattedDate} ${formattedTime}</td>
        <td>${expense.category}</td>
        <td>${expense.description}</td>
        <td>${expense.amount}</td>
      `;
        tbodyMonthly.appendChild(row);
      });

      // Update the total amount in the footer
      tfootMonthly.innerHTML = `
      <tr>
        <td></td>
        <td></td>
        <td>Total</td>
        <td id="monthlyTotalAmount">${totalAmount}</td>
      </tr>
    `;
    } catch (err) {
      console.log(err);
    }
  });

  showYearlyButton.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const selectedYear = document.getElementById("year-input").value;
      let token = localStorage.getItem("token");
      const response = await axios.post(
        "http://13.201.3.39/reports/yearlyReports",
        { year: selectedYear },
        { headers: { Authorization: token } }
      );
      console.log(response.data);

      // Clear existing table data
      tbodyYearly.innerHTML = "";

      // Update the table with the received data
      let totalAmount = 0;
      response.data.forEach((monthlyExpense) => {
        totalAmount += monthlyExpense.amount;
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${monthlyExpense.month}</td>
        <td>${monthlyExpense.amount}</td>
      `;
        tbodyYearly.appendChild(row);
      });

      // Update the total amount in the footer
      tfootYearly.innerHTML = `<tr>
     <td>Total</td>
     <td>${totalAmount}</td>
     </tr>`;
    } catch (err) {
      console.log(err);
    }
  });
});
