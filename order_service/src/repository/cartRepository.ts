import { CartRepositoryType } from "../../types/Repository";


const createCart = async (input: any): Promise<{}> => {

    return Promise.resolve({});
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