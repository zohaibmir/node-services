import exp from "constants";
import { ICatalogRepository } from "../../interface/catalogRepositoryInterfaces";
import { CatalogRepository } from "../../repository/catalogRepository";
import { CatalogService } from "../catalogService";
import { faker } from "@faker-js/faker";
import { Product } from "../../models/product";
import { Factory } from "rosie";

const mockProduct = ((rest: any) => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: +faker.commerce.price(),
        stock: faker.number.int({ min: 10, max: 100 }),
        ...rest,
    };
})

//Rosie library
const productFactory = new Factory<Product>()
    .attr("id", faker.number.int({ min: 1, max: 1000 }))
    .attr("name", faker.commerce.productName())
    .attr("description", faker.commerce.productDescription())
    .attr("stock", faker.number.int({ min: 10, max: 100 }))
    .attr("price", +faker.commerce.price());

describe("catalogService", () => {

    let repository: ICatalogRepository;

    //initialize dependencies
    beforeEach(() => {
        repository = new CatalogRepository();
    });

    describe("createProduct", () => {

        test("Create a product", async () => {
            const service = new CatalogService(repository);
            const reqBody = mockProduct({});
            const result = await service.createProduct(reqBody);
            expect(result).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
                description: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number),
            });
        })

        test("Unable to create the product, throw the error", async () => {
            const service = new CatalogService(repository);
            const reqBody = mockProduct({
                price: +faker.commerce.price(),
            });

            jest
                .spyOn(repository, 'create')
                .mockImplementationOnce(() => Promise.resolve({} as Product));
            await expect(service.createProduct(reqBody)).rejects.toThrow(
                "Unable to create product"
            );
        });


        test("Product already exist, throw the error", async () => {
            const service = new CatalogService(repository);
            const reqBody = mockProduct({
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


    describe("updateProduct", () => {

        test("Create a product", async () => {
            const service = new CatalogService(repository);
            const reqBody = mockProduct({ id: faker.number.int({ min: 10, max: 1000 }) });
            const result = await service.updateProduct(reqBody);
            expect(result).toMatchObject(reqBody);
        });

        test("Product does not exist, throw the error", async () => {
            const service = new CatalogService(repository);
            const reqBody = mockProduct({
                price: +faker.commerce.price(),
            });

            jest
                .spyOn(repository, 'update')
                .mockImplementationOnce(() =>
                    Promise.reject(new Error("product does not exist"))
                );
            await expect(service.updateProduct(reqBody)).rejects.toThrow(
                "product does not exist"
            );
        });

    });


    describe("getProducts", () => {
        //test.only
        test("get products by offset and limit", async () => {
            const service = new CatalogService(repository);
            const randomLimit = faker.number.int({ min: 10, max: 100 });
            const products = productFactory.buildList(randomLimit);
            jest
            .spyOn(repository, 'find')
                .mockImplementation(() => Promise.resolve(products));
            const result: any = await service.getProducts(randomLimit, 0)

            expect(result.length).toEqual(randomLimit);
            expect(result).toMatchObject(products);
        });

    
        test("Products doen not exist error", async () => {
            const service = new CatalogService(repository);
            jest
                .spyOn(repository, "find")
                .mockImplementationOnce(() =>
                    Promise.reject(new Error("products does not exist"))
                );

            await expect(service.getProducts(0, 0))
            .rejects
            .toThrow("products does not exist");
        });
    });



    describe("getProduct", () => {
        //test.only
        test("get products by offset and limit", async () => {
            const service = new CatalogService(repository);
            const product = productFactory.build();
            jest
            .spyOn(repository, 'findOne')
                .mockImplementation(() => Promise.resolve(product));
            const result: any = await service.getProduct(product.id!);
            expect(result).toMatchObject(product);
        });
    });


    describe("deleteProduct", () => {
        //test.only
        test("get products by offset and limit", async () => {
            const service = new CatalogService(repository);
            const product = productFactory.build();
            console.log(product);
            const result: any = await service.deleteProduct(product.id!);
            console.log(result);
            expect(result).toEqual(product.id);
        });
    });

    //clean up things here
    afterEach(() => {
        repository = {} as CatalogRepository;
    });
});