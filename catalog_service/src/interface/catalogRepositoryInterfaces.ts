import { Product } from "../models/product";

export interface ICatalogRepository {
    create(data: Product): Promise<Product>;
    update(data: Product): Promise<Product>;
    delete(id: number): any;
    find(limit: number, offset: number): Promise<Product[]>;
    findOne(id: number): Promise<Product>
}