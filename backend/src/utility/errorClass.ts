import { ClientErrors } from '../config/httpStatusCode';

export class RequestError<T = unknown> extends Error {
  private httpStatusCode: number;
  private code: string;
  private payload?: T;

  constructor({
    message,
    status,
    code,
    payload,
  }: {
    message: string;
    code: string;
    payload?: T;
    status: ClientErrors;
  }) {
    super(message);

    this.name = this.constructor.name;

    this.httpStatusCode = status;
    this.code = code;
    this.payload = payload;
  }

  get HttpStatusCode() {
    return this.httpStatusCode;
  }

  toJSON() {
    return {
      error: {
        message: this.message,
        code: this.code,
        stack: this.stack,
        payload: this.payload,
      },
    };
  }
}
