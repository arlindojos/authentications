  
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const findUser = async (username: string) => {
  const user = await prisma.users.findUnique({
    where: { username },
  });

  if(!user) return null;

  return user;
}

export default findUser;