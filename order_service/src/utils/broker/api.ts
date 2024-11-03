import axios from "axios";
import { APIError, AuthorizeError, NotFoundError } from "../error";
import { logger } from "../logger";
import {Product} from "../../dto/productDto";


const CATALOG_BASE_URL =
  process.env.CATALOG_BASE_URL || "http://localhost:3000"; // env variable

  export const GetProductDetails = async (productId: number) => {
    try {
      const response = await axios.get(
        `${CATALOG_BASE_URL}/products/${productId}`
      );
      return response.data as Product;
    } catch (error) {
      logger.error(error);
      throw new NotFoundError("product not found");
    }
  };
  
  export const GetStockDetails = async (ids: number[]) => {
    try {
      const response = await axios.post(`${CATALOG_BASE_URL}/products/stock`, {
        ids,
      });
      return response.data as Product[];
    } catch (error) {
      logger.error(error);
      throw new NotFoundError("error on getting stock details");
    }
  };