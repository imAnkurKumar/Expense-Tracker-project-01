document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const userName = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await axios.post("http://localhost:3000/user/signUp", {
      username: userName,
      email: email,
      password: password,
    });

    console.log("signUp successful: ", response.data);
  } catch (err) {
    console.log("signUp error: ", err.response.data.message);
  }
});
