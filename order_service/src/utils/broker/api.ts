import axios from "axios";


const CATALOG_BASE_URL =
  process.env.CATALOG_BASE_URL || "http://localhost:3000"; // env variable


export const GetProductDetails = async (productId: number) => {
  try {

    return { stock:10, price:100, name:"Iphone 16"}; //mock data

    // const response = await axios.get(
    //   `${CATALOG_BASE_URL}/products/${productId}`
    // );
    // return response.data;
  } catch (error) {
    throw new Error("product not found");
  }
};