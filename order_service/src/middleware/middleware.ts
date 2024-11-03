
import { NextFunction, Request, Response } from "express";

export const RequestAuthorizer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // jwt
  const isValidUser = true;
  if (!isValidUser) {
    return next(res.status(403).json({ error: "authorization error" }));
  }
  next();
};