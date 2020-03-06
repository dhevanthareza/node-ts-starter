import { Response } from 'express';

export class ResponseService {
  public static success(res: Response, message: string, data: any) {
    res.status(200).json({
      message,
      data,
    })
  }
  public static error(res: Response, err: any) {
    const message: string = err.message || 'Internal Server Error'
    const data: any = err.data || err
    const statusCode: number = err.statusCode || 500
    res.status(statusCode).json({
      message,
      data,
    })
  }
}