import bcrypt from "bcrypt";

// Hash password
export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

// Compare password with hash
export const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};