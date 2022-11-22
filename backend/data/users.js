import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("admin", 10),
    isAdmin: true,
  },
  {
    name: "Islam",
    email: "islam@example.com",
    password: bcrypt.hashSync("islam", 10),
  },
  {
    name: "Yassin",
    email: "yassin@example.com",
    password: bcrypt.hashSync("yassin", 10),
  },
];

export default users;
