import { DI } from '@microsoft/fast-foundation';
import 'reflect-metadata';
import { instanceToPlain } from 'class-transformer';

export class JSONSerializer implements Serializer {
  public serialize(object: any): string {
    return JSON.stringify(instanceToPlain(object));
  }

  public deserialize<T>(input: any): Promise<T> {
    if (input && input.ok) {
      return input.text().then((text: string, ) => JSON.parse(text) );
    }

    return JSON.parse(input);
  }
}

export const Serializer = DI.createInterface(x => x.singleton(JSONSerializer));
export interface Serializer {
  serialize(object: any): string;
  deserialize<T>(response: Response): Promise<T>;
}