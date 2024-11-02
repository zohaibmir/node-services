import exp from "constants";
import { ICatalogRepository } from "../../interface/catalogRepositoryInterfaces";
import { CatalogRepository } from "../../repository/catalogRepository";
import { CatalogService } from "../catalogService";
import {faker} from "@faker-js/faker";
import { Product } from "../../models/product";

const mockProduct = ((rest: any) => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(), 
        price: +faker.commerce.price(),
        stock: faker.number.int( {min: 10, max: 100}),
        ...rest,
    };
})

describe("catalogService", () => {

    let repository: ICatalogRepository;

    //initialize dependencies
    beforeEach(() => {
        repository = new CatalogRepository();
    });

    describe("createProduct", () => {

        test("Create a product", async() => {
            const service = new CatalogService(repository);
            const reqBody =  mockProduct({});
            const result = await service.createProduct(reqBody);
            expect(result).toMatchObject({
                id: expect.any(Number), 
                name: expect.any(String), 
                description: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number), 
            });
        })

        test("Unable to create the product, throw the error", async() => {
            const service = new CatalogService(repository);
            const reqBody =  mockProduct({
                price: +faker.commerce.price(),
            });
            
            jest
                .spyOn(repository, 'create')
                .mockImplementationOnce(() => Promise.resolve({} as Product));
            await expect(service.createProduct(reqBody)).rejects.toThrow(
                "Unable to create product"
            );
        });


        test("Product already exist, throw the error", async() => {
            const service = new CatalogService(repository);
            const reqBody =  mockProduct({
                price: +faker.commerce.price(),
            });
            
            jest
                .spyOn(repository, 'create')
                .mockImplementationOnce(() => 
                    Promise.reject(new Error("product already exist"))
                );
            await expect(service.createProduct(reqBody)).rejects.toThrow(
                "product already exist"
            );
        });
    });

    //clean up things here
    afterEach(() => {
       repository = {} as CatalogRepository; 
    });
});