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
        
        return Promise.resolve(data as unknown as Product);
    }
    delete(id: number): number {
        
        return id;
    }
    find(limit: number, offset: number): Promise<Product[]> {
        
        return Promise.resolve([]);
    }
    findOne(id: number): Promise<Product> {
        
        return Promise.resolve({ id } as unknown as Product);
    }
  
}