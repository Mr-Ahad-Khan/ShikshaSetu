const crypto = require("crypto");
const Account = require("../Models/Account");

const TOKEN_TTL_MS = 1000 * 60 * 60 * 12;

function tokenSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is required. Add it to Backend/.env.");
  return secret;
}

function signToken(payload) {
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", tokenSecret()).update(encoded).digest("base64url");
  return `${encoded}.${signature}`;
}

function verifyToken(token) {
  const [encoded, signature] = (token || "").split(".");
  if (!encoded || !signature) return null;
  const expected = crypto.createHmac("sha256", tokenSecret()).update(encoded).digest("base64url");
  if (signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
  return payload.exp > Date.now() ? payload : null;
}

function createToken(account) {
  return signToken({ sub: account.id, role: account.role, exp: Date.now() + TOKEN_TTL_MS });
}

async function requireAuth(req, res, next) {
  try {
    const token = req.headers.authorization?.replace(/^Bearer\s+/i, "");
    const payload = verifyToken(token);
    if (!payload) return res.status(401).json({ message: "Please sign in to continue" });
    const account = await Account.findById(payload.sub);
    if (!account) return res.status(401).json({ message: "Your account is no longer available" });
    req.account = account;
    next();
  } catch (_error) {
    return res.status(401).json({ message: "Invalid or expired session" });
  }
}

function requireAdmin(req, res, next) {
  if (req.account?.role !== "admin") return res.status(403).json({ message: "Admin permission is required" });
  next();
}

module.exports = { createToken, requireAuth, requireAdmin };
