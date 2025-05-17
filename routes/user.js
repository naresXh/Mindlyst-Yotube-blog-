const { Router } = require("express");
const User = require("../models/user");
const router = Router();

router.get("/signin", (req, res) => {
  res.render("signin", { error: null });
});

router.get("/signup", (req, res) => {
  res.render("signup", { error: null });
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/user/signin");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email and Password",
    });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});
module.exports = router;
