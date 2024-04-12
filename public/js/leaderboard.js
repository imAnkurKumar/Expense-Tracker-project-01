document.addEventListener("DOMContentLoaded", async () => {
  async function showLeaderboard() {
    try {
      let token = localStorage.getItem("token");

      const userLeaderboardAarray = await axios.get(
        "http://localhost:4000/premium/showLeaderboard",
        { headers: { Authorization: token } }
      );
      const leaderboardContent = document.getElementById("leaderboard-content");

      leaderboardContent.innerHTML = "";
      userLeaderboardAarray.data.forEach((userDetails) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Name : ${userDetails.name} - Total Expense : ${userDetails.totalExpenses}`;
        leaderboardContent.appendChild(listItem);
      });
    } catch (error) {
      console.log("Error in fetching data", error);
    }
  }

  showLeaderboard();
});
