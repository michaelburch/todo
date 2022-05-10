import { DI } from '@microsoft/fast-foundation';
import { Serializer } from './serializer';

export interface Http {
  post<T = any>(url: string, data: T): Promise<Response>;
  get<T = any>(url: string): Promise<T>;
  put<T = any>(url: string, data: T): Promise<Response>;
  delete(url: string): Promise<Response>;
}

class HttpImpl implements Http {
  constructor(@Serializer private serializer: Serializer) {}

  async post<T>(url: string, data: T): Promise<Response> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: this.serializer.serialize(data),
    });

    return response
  }

  async get<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      method: 'GET'
    });

    return this.serializer.deserialize<T>(response);
  }

  async put<T>(url: string, data: T): Promise<Response> {
    const response = await fetch(url, {
      method: "PUT",
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
    });

    return response
  }
}

export const Http = DI.createInterface<Http>(
  x => x.singleton(HttpImpl)
);