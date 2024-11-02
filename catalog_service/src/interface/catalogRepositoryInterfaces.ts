import { Product } from "../models/product";

export interface ICatalogRepository {
    create(data: Product): Promise<Product>;
    update(data: Product): Promise<Product>;
    delete(id: number): number;
    find(limit: number, offset: number): Promise<Product[]>;
    findOne(id: number): Promise<Product>
}