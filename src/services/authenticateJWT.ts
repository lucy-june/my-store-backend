import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyAuthJWT = (req: Request, res: Response, next: Function) => {
  console.log('req.headers.authorization: ', req.headers.authorization?.split(" ")[1]);
  const token: string = req.headers.authorization?.split(" ")[1] as string;
  try {
    jwt.verify(token, process.env.TOKEN_SECRET as string, (err, verifyData) => {
      if (err) {
        res.sendStatus(403);
        res.json(`${err}`);
        return;
      }
      console.log('%%%%%%%%%%%%%%%%% session', verifyData);
      next();
    });
  } catch (err) {
    res.status(401);
    res.json(`Invalid token ${err}`);
    return;
  }
}