class ErrorHandler extends Error {
  public statusCode: number;
  public message: string;
  public data: any;

  constructor(statusCode: number, message: string = 'Internal Server Error', data: any = {}) {
    super()
    this.statusCode = statusCode;
    this.message = message;
    this.data = data
  }
}

export default ErrorHandler