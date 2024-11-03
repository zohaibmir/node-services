import { CartRepositoryType } from "../../types/Repository";
import * as Repository from "../../repository/cartRepository";
import { CreateCart } from "../cartService"

describe("cartService", () => {

    let repo: CartRepositoryType;
    beforeEach(() => {
        repo = Repository.CartRepository;
    });

    afterEach(() => {
        repo = {} as CartRepositoryType;;
    });

    it("Create data with success response", async () => {

        const mockCart = {
            title: "smart phone",
            price: 1200
        }

        const response = await CreateCart(mockCart, repo);

        jest
            .spyOn(Repository.CartRepository, "create")
            .mockImplementation(() =>
                Promise.resolve({
                    message: "Test response from cart repository",
                    input: mockCart
                })
            )
        expect(response).toEqual({
            message: "Test response from cart repository",
            input: mockCart,
        })
    })
})