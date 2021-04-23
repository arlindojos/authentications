import bcrypt from 'bcrypt';

export const genPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  
  const hash = await bcrypt.hash(password, 10);
  return hash
}

export const isValidPassword = async (password: string, hash: string) => {
  const result = await bcrypt.compare(password, hash);
  return result;
}