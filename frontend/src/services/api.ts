type FetchArgs<T> = {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: T;
};

export class ApiService {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  isJsonResponse(response: Response) {
    const contentType = response.headers.get('Content-Type')?.toLowerCase();
    return contentType.includes('application/json');
  }

  async fetch<Res = unknown, Req = unknown>({
    endpoint,
    method,
    data,
  }: FetchArgs<Req>) {
    const url = `${this.baseUrl}/${endpoint}`;
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    };

    const response: Response = await fetch(url, config);
    const isJsonResponse = this.isJsonResponse(response);
    const responseJson = isJsonResponse ? await response.json() : null;

    if (response.ok) {
      return responseJson as Res;
    } else {
      const { error } = responseJson;

      if (!error) {
        throw new Error('UNKNOWN_ERROR');
      }

      const { message, code, payload } = error;

      throw new RequestError({ message, code, payload });
    }
  }

  get<Res = unknown, Req = unknown>(args: Omit<FetchArgs<Req>, 'method'>) {
    return this.fetch<Res, Req>({ ...args, method: 'GET' });
  }

  post<Res = unknown, Req = unknown>(args: Omit<FetchArgs<Req>, 'method'>) {
    return this.fetch<Res, Req>({ ...args, method: 'POST' });
  }

  put<Res = unknown, Req = unknown>(args: Omit<FetchArgs<Req>, 'method'>) {
    return this.fetch<Res, Req>({ ...args, method: 'PUT' });
  }

  delete<Res = unknown, Req = unknown>(args: Omit<FetchArgs<Req>, 'method'>) {
    return this.fetch<Res, Req>({ ...args, method: 'DELETE' });
  }

  patch<Res = unknown, Req = unknown>(args: Omit<FetchArgs<Req>, 'method'>) {
    return this.fetch<Res, Req>({ ...args, method: 'PATCH' });
  }
}

export class RequestError<T = unknown> extends Error {
  code: string;
  payload?: T;

  constructor({
    message,
    code,
    payload,
  }: {
    message: string;
    code: string;
    payload?: T;
  }) {
    super(message);
    this.code = code;
    this.payload = payload;
  }
}

export const apiService = new ApiService('http://localhost:8080');
