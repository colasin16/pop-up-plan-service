import { Identifier } from "./model/Identifier";

export interface Repository<M> {
    create(object: M): Promise<M | null>;
    find(id: Identifier): Promise<M | null>;
    findAll(): Promise<M[]>;
    findMultipleObjectsById(ids: Identifier[]): Promise<M[]>
    update(object: M): Promise<M | null>;
    delete(id: Identifier): void;
}
