const crypto = require("crypto");
const express = require("express");
const Account = require("../Models/Account");
const { createToken, requireAuth } = require("../Middleware/auth");

const router = express.Router();
const hashPassword = (password, salt = crypto.randomBytes(16).toString("hex")) =>
  new Promise((resolve, reject) => crypto.scrypt(password, salt, 64, (error, derivedKey) =>
    error ? reject(error) : resolve(`${salt}:${derivedKey.toString("hex")}`),
  ));
const matchesPassword = async (password, stored) => {
  const [salt, hash] = stored.split(":");
  const candidate = await hashPassword(password, salt);
  return crypto.timingSafeEqual(Buffer.from(candidate), Buffer.from(`${salt}:${hash}`));
};
const validPassword = (password) => typeof password === "string" && password.length >= 8;

function response(res, account) {
  return res.status(200).json({ message: "Login successful", token: createToken(account), account: account.toJSON() });
}

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !validPassword(password)) return res.status(400).json({ message: "Name, email, and a password of at least 8 characters are required" });
  try {
    const existing = await Account.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ message: "An account already exists for this email" });
    const account = await Account.create({ name, email, passwordHash: await hashPassword(password), role: "user" });
    return response(res, account);
  } catch (error) {
    return res.status(400).json({ message: "Unable to create your account", error: error.message });
  }
});

router.post("/bootstrap-admin", async (req, res) => {
  const { name, email, password, setupKey } = req.body;
  if (!name || !email || !validPassword(password)) return res.status(400).json({ message: "Name, email, and a password of at least 8 characters are required" });
  try {
    const adminExists = await Account.exists({ role: "admin" });
    if (adminExists && (!process.env.ADMIN_SETUP_KEY || setupKey !== process.env.ADMIN_SETUP_KEY)) {
      return res.status(403).json({ message: "Admin creation is restricted. Use the configured setup key." });
    }
    if (await Account.exists({ email: email.toLowerCase() })) return res.status(409).json({ message: "An account already exists for this email" });
    const account = await Account.create({ name, email, passwordHash: await hashPassword(password), role: "admin" });
    return response(res, account);
  } catch (error) {
    return res.status(400).json({ message: "Unable to create the admin account", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !["admin", "user"].includes(role)) return res.status(400).json({ message: "Email, password, and account type are required" });
  const account = await Account.findOne({ email: email.toLowerCase(), role }).select("+passwordHash");
  if (!account || !(await matchesPassword(password, account.passwordHash))) return res.status(401).json({ message: "Incorrect email, password, or account type" });
  return response(res, account);
});

router.get("/me", requireAuth, (req, res) => res.json({ account: req.account }));
module.exports = router;
