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

    updateProduct(input: Product) {

    }

    getProducts(limit: number = 10, offset: number) {

    }

    getProduct(id: number) {

    }

    deleteProduct(id: number) {

    }
}