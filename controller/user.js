const path = require("path");
const User = require("../model/user");

exports.getSignUpPage = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "public", "views", "signUp.html"));
};
exports.getLoginPage = (req, res, next) => {
  res.sendFile(
    path.join(__dirname, "../", "public", "views", "loginPage.html")
  );
};
exports.postUserSignUp = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const newUser = await User.create({
      name: name,
      email: email,
      password: password,
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.postUserLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    res.status(200).json({ message: "Login Successful" });
  } catch (error) {
    console.error("Login Error : ", error);
    res.status(500).json({ message: "server error" });
  }
};
