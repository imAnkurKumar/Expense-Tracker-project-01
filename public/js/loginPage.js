document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("login-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const response = await axios.post("http://localhost:4000/user/login", {
          email,
          password,
        });
        if (response.status === 200) {
          alert("login successful: ", response.data.message);
        }
        window.location.href = "../views/homePage.html";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
      } catch (error) {
        if (error.response.status === 401) {
          alert("Error : " + error.response.data.message);
        } else {
          console.error("login error :", error.response.data.message);
        }
      }
    });
});
