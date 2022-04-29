import { Identifier } from "./Identifier";

/**
 * This is a class which holds ids of arrays of objects, 
 * so it can be responsible for OneToMany relation. When it needs to fetch real object
 * the it can fetch them, but for now it's a lightweight methods that only holds objects' ids.
 * 
 */
export class OneToMany<M>{
    private _values: Identifier[];

    constructor(values?: Identifier[]) {
        this._values = values ?? [];
    }

    /**
     * fetches real objects that are of type M which _values holds its' ids.
     */
    public async fetchValues(): Promise<M[]> {
        throw new Error("Method not implemented.");
    }

    /**
     * push a new id into the object
     * @param id 
     */
    public push(id: Identifier) {
        this._values.push(id)
    }

    /**
     * getter for values which returns all items' objects.
     */
    get values(): Identifier[] {
        return this._values
    }
}
