import { ICatalogRepository } from "../interface/catalogRepositoryInterfaces";
import { Product } from "../models/product";

export class CatalogService {

    private _repository: ICatalogRepository;

    constructor(repository: ICatalogRepository) {
        this._repository = repository;
    }

    createProduct(input: Product) {

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