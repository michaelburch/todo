import { observable } from "@microsoft/fast-element";
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TodoItem {
    @Expose()
    @observable id: string = "";
    @Expose()
    @observable tenantId: string = "";
    @Expose()
    @observable name: string = "";
    @Expose()
    @observable isComplete: boolean = false;
    constructor(name: string) {
        this.name = name;
    }
    public toggleComplete() {
        this.isComplete = !this.isComplete;
    }
  
  }