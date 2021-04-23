import { NextFunction, Request, Response } from "express";
import { Cookie } from "express-session";

export interface Session {
  viewCount: number
  cookie: Cookie
}

const verifyToken = (request: Request, response: Response, next: NextFunction) => {
  const session = request.session as unknown as Session;

  if (session.viewCount) {
    session.viewCount++;
  } else {
    session.viewCount = 1
  }
  next()
}

export default verifyToken;