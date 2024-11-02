import { ICatalogRepository } from "../interface/catalogRepositoryInterfaces";
import { Product } from "../models/product";

export class CatalogService {

    private _repository: ICatalogRepository;

    constructor(repository: ICatalogRepository) {
        this._repository = repository;
    }

    async createProduct(input: Product) {
        const data = this._repository.create(input);
        if(!(await data).id) {
            throw new Error("Unable to create product");
        }
        
        return data;
    }

    async updateProduct(input: Product) {

        const data = await this._repository.update(input);
        //emit event to update record in Open search

        return data;
    }

    async getProducts(limit: number = 10, offset: number) : Promise<Product[]>{

        const products = await this._repository.find(limit, offset);

        return products;
    }

    async getProduct(id: any) {
        const product = await this._repository.findOne(id);

        return product;
    }

    async deleteProduct(id: number) : Promise<number>{
        const productId = await this._repository.delete(id); 
        //delete record from Elastic search
        return productId;
    }
}