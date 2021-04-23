import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Session } from '../auth/isAuth';
import { genPassword, isValidPassword } from '../lib/passwordUtils';

const prisma = new PrismaClient();

export default {
  async index(request: Request, response: Response) {  
    const session = request.session as unknown as Session;

    response.json({
      message: 'There you go again!!',
      visitedTimes: session.viewCount
    });
  },

  async create(request: Request, response: Response) {  
    
  },
}