import { NextFunction, Request, Response } from "express";

import ApiError from "../helpers/apiError";

export default function (
  error: ApiError,
  request: Request,
  response: Response,
  next:NextFunction
) {
  response.status(error.statusCode).json({
    status: "error",
    statusCode: error.statusCode,
    message: error.message,
  });
}
