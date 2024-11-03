import { CartRepositoryType } from "../types/Repository";
import { GetProductDetails } from "../utils/broker";
import { CartRequestInput } from "../dto/cartRequest";

export const CreateCart = async (input: CartRequestInput, repo: CartRepositoryType) => {

    //make a synchronous call to catalog product microservice. 
    const product = await GetProductDetails(input.productId);
    if (product.stock < input.qty) {
        throw new Error("product is out of stock");
    }

    const data = await repo.create(input);

    return data;

};


export const GetCart = async (input: any, repo: CartRepositoryType) => {
    const data = await repo.find(input);

    return data;
};


export const EditCart = async (input: any, repo: CartRepositoryType) => {
    const data = await repo.update(input);

    return data;
};

export const DeleteCart = async (input: any, repo: CartRepositoryType) => {
    const data = await repo.delete(input);

    return data;
};