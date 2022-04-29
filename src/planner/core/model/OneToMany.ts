import { Identifier } from "./Identifier";

export class OneToMany<M>{
    private readonly _value: Identifier[];

    constructor() {
        this._value = [];
    }

    public async fetchValues(): Promise<M[]> {
        return Promise.resolve([])
    }
}
