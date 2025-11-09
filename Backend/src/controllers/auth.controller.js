import { exec } from "child_process";
import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helper/tokenHelper.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const signup = (req, res) => {
  const { name, email, password, role, identifier } = req.body;
  const classIDs = req.body.classIDs || []; // array or omitted

  if (!name || !email || !password || !role || !identifier) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hash = hashPassword(password); // bcrypt
  const classList = classIDs.join(";");

  // send identifier and class list as extra lines
  const input = `${name}\n${email}\n${hash}\n${role}\n${identifier}\n${classList}\n`;

  const exePath = path.join(__dirname, "..", "..", "compiled", "add_user.exe");
  if (!fs.existsSync(exePath))
    return res.status(500).json({ message: "Executable not found" });

  const child = exec(`"${exePath}"`, (err, stdout, stderr) => {
    if (err)
      return res.status(500).json({ message: "Internal error", error: err });
    if (stdout.startsWith("ERROR:EMAIL_EXISTS"))
      return res.status(409).json({ message: "Email already exists" });
    if (stdout.startsWith("SUCCESS:")) {
      const id = stdout.split(":")[1].trim();
      const user = { id, name, email, role, identifier, classIDs };
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "7d" });
      return res
        .status(201)
        .json({ message: "User created successfully", user, token });
    }
    return res.status(500).json({ message: "Unexpected response" });
  });

  child.stdin.write(input);
  child.stdin.end();
};

export const login = (req, res) => {
  const { email, password } = req.body;
  const exePath = path.join(
    __dirname,
    "..",
    "..",
    "compiled",
    "get_user_by_email.exe"
  );

  if (!fs.existsSync(exePath))
    return res.status(500).json({ message: "Executable not found" });

  const child = exec(`"${exePath}"`, (err, stdout, stderr) => {
    if (err)
      return res.status(500).json({ message: "Internal error", error: err });

    if (stdout.startsWith("ERROR:NOT_FOUND"))
      return res.status(404).json({ message: "Email not registered" });

    if (stdout.startsWith("SUCCESS:")) {
      const [, data] = stdout.split(":");
      // data -> id,name,email,role,identifier,classlist,passwordHash
      // Split last two carefully since classlist may be empty
      const parts = data.split(",");
      // parts: [id, name, email, role, identifier, classList, passwordHash] (expected)
      const id = parts[0];
      const name = parts[1];
      const emailResp = parts[2];
      const role = parts[3];
      const identifier = parts[4];
      const classList = parts[5]; // "10;12" or ""
      const passwordHash = parts.slice(6).join(","); // passwordHash may contain commas? unlikely for bcrypt but safe

      // convert classList string to array of ints
      const classIDs = classList
        ? classList
            .split(";")
            .filter((s) => s !== "")
            .map((x) => parseInt(x, 10))
        : [];

      if (!comparePassword(password, passwordHash)) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const user = { id, name, email: emailResp, role, identifier, classIDs };
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "7d" });

      return res.json({ message: "Login successful", user, token });
    }

    return res.status(500).json({ message: "Unexpected response" });
  });

  child.stdin.write(email + "\n");
  child.stdin.end();
};

export const checkAuth = (req, res) => {
  return res.json({
    authenticated: true,
    user: req.user,
  });
};
