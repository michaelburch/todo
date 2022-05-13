import { DI } from '@microsoft/fast-foundation';
import { Serializer } from './serializer';

export interface Http {
  post<T = any>(url: string, data: T): Promise<Response>;
  get<T = any>(url: string): Promise<T>;
  put<T = any>(url: string, data: T): Promise<Response>;
  delete(url: string): Promise<Response>;
  setCredentialMode(mode: RequestCredentials): void;
}

class HttpImpl implements Http {
  constructor(@Serializer private serializer: Serializer, private credentialMode: RequestCredentials = "omit") { }
  setCredentialMode(mode: RequestCredentials): void {
    this.credentialMode = mode;
  }
  async post<T>(url: string, data: T): Promise<Response> {
    const response = await fetch(url, {
      method: 'POST',
      credentials: this.credentialMode,
      headers: {
        "Content-Type": "application/json",
      },
      body: this.serializer.serialize(data),
    });

    return response
  }

  async get<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      credentials: this.credentialMode,
      method: 'GET'
    });

    return this.serializer.deserialize<T>(response);
  }

  async put<T>(url: string, data: T): Promise<Response> {
    const response = await fetch(url, {
      method: "PUT",
      credentials: this.credentialMode,
      headers: {
        "Content-Type": "application/json",
      },
      body: this.serializer.serialize(data),
    });

    return response
  }

  async delete(url: string): Promise<Response> {
    const response = await fetch(url, {
      method: "DELETE",
      credentials: this.credentialMode
    });

    return response
  }
}

export const Http = DI.createInterface<Http>(
  x => x.singleton(HttpImpl)
);