import request from "supertest";
import express from "express";
import { faker } from "@faker-js/faker/.";
import catalogRoute, {catalogService} from "../CatalogRoutes";
import { productFactory } from "../../utils/fixtures";

const app = express();
app.use(express.json());
app.use(catalogRoute);


const mockRequest = () => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: +faker.commerce.price(),
        stock: faker.number.int({ min: 10, max: 100 }),
    };
};

describe("Catalog Routes", () => { 

    describe("POST /api/products", () => {
        test("create product with successfully", async () => {
            const requestBody = mockRequest();
            const product = productFactory.build()
            jest
                .spyOn(catalogService, 'createProduct')
                .mockImplementationOnce(() => Promise.resolve(product))
            const response = await request(app)
                .post("/products")
                .send(requestBody)
                .set("Accept", "application/json");
            console.log("Test Response", response);
            expect(response.status).toBe(201);
            expect(response.body).toEqual(product);
        });

        test("response with validation error", async () => {
            const requestBody = mockRequest();
            const response = await request(app)
                .post("/products")
                .send({...requestBody, name: ""}) //send empty name
                .set("Accept", "application/json");
            expect(response.status).toBe(400);
            expect(response.body).toEqual("name should not be empty");
        });

        
    });
});