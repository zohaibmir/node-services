import { ICatalogRepository } from "../interface/catalogRepositoryInterfaces";
import { Product } from "../models/product";

export class CatalogRepository implements ICatalogRepository {
    create(data: Product): Promise<Product> {
        const mockProduct = {
            id: 123,
            ...data
        } as Product
        
        return Promise.resolve(mockProduct);
    }
    update(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    delete(id: any): void {
        throw new Error("Method not implemented.");
    }
    find(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    findOne(id: number): Promise<Product> {
        throw new Error("Method not implemented.");
    }
  
}