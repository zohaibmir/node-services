import { ICatalogRepository } from "../../interface/catalogRepositoryInterfaces";
import { CatalogRepository } from "../../repository/catalogRepository";
import { CatalogService } from "../catalogService";

describe("catalogService", () => {

    let repository: ICatalogRepository;

    //initialize dependencies
    beforeEach(() => {
        repository = new CatalogRepository();
    });

    describe("createProduct", () => {

        test("Create a product", async() => {
            const service = new CatalogService(repository);
            const reqBody = {name: "Iphone", description: "Smart Phone", price: 1200, stock: 10};
            const result = await service.createProduct(reqBody);
            expect(result).toMatchObject({
                id: expect.any(Number), 
                name: "Iphone", 
                description: expect.any(String),
                price: 1200, 
                stock: 10
            });
        })

        test("Product already exist, throw the error", () => {
            
        })
    });

    //clean up things here
    afterEach(() => {
       repository = {} as CatalogRepository; 
    });
});