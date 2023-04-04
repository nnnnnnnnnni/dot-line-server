export class Response {
  public code: number;
  public message: string;
  public data: any;
  constructor (code?: number, message?: string, data?: any) {
    this.code = code || 200;
    this.message = message || '';
    this.data = data || null;
  }

  get () {
    return {
      code: this.code,
      message: this.message,
      data: this.data
    }
  }
}