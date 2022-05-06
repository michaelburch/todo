import { DI } from '@microsoft/fast-foundation';
import 'reflect-metadata';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { TodoItem } from '../todo-item';

export class JSONSerializer implements Serializer {
  public serialize(object: any): string {
    return JSON.stringify(instanceToPlain(object));
  }

  public deserialize<T>(input: any) {
    if (input && input.ok) {
      return input.text().then((text: string) => plainToInstance(TodoItem,JSON.parse(text)) );
    }

    return JSON.parse(input);
  }
}

export const Serializer = DI.createInterface(x => x.singleton(JSONSerializer));
export interface Serializer {
  serialize(object: any): string;
  deserialize<T = any>(response: Response): Promise<T>;
}