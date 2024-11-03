import { CartRepositoryType } from "../types/Repository";
import { DB } from "../db/dbConnection";
import { Cart, CartLineItem, cartLineItems, carts } from "../db/schema";


const createCart = async (input: any): Promise<{}> => {
    const result = await DB.insert(carts).values( {
        customerId:124
    }).returning({cartId: carts.id});

    return Promise.resolve({message: result, input});
}

const updateCart = async (input: any): Promise<{}> => {

    return Promise.resolve({});
}
const findCart = async (input: any): Promise<{}> => {

    return Promise.resolve({});
}
const deleteCart = async (input: any): Promise<{}> => {

    return Promise.resolve({});
}
export const CartRepository: CartRepositoryType = {
    create:createCart,
    find:  findCart,
    update: updateCart,
    delete: deleteCart,
}