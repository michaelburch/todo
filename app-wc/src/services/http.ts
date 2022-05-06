import { xyzToLAB } from '@microsoft/fast-colors';
import { DI } from '@microsoft/fast-foundation';
import { TodoItem } from '../todo-item';
import { Serializer } from './serializer';

export interface Http {
  post<T = any>(url: string, todo: TodoItem): Promise<Response>;
  get<T = any>(url: string): Promise<T>;
  put<T = any>(url: string, todo: TodoItem): Promise<Response>;
  delete(url: string): Promise<Response>;
}

class HttpImpl implements Http {
  constructor(@Serializer private serializer: Serializer) {}

  async post<T>(url: string, todo: T): Promise<Response> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: this.serializer.serialize(todo),
    });

    return response
  }

  async get<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      method: 'GET'
    });

    return this.serializer.deserialize<T>(response);
  }

  async put<T>(url: string, todo: T): Promise<Response> {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: this.serializer.serialize(todo),
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