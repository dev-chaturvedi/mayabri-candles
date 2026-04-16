const DEFAULT_SUPER_USERS = [
  "abhaychaturvedi2312@gmail.com",
  "mayankabriti@gmail.com",
];

const envSuperUsers = (process.env.SUPER_USER_EMAILS || "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

const SUPER_USER_EMAILS = Array.from(
  new Set(
    [...DEFAULT_SUPER_USERS, ...envSuperUsers].map((email) => email.toLowerCase())
  )
);

module.exports = { SUPER_USER_EMAILS };
