import { PrismaClient } from "@prisma/client";
import { ICatalogRepository } from "../interface/catalogRepositoryInterfaces";
import { Product } from "../models/product";
import { NotFoundError } from "@prisma/client/runtime/library";

export class CatalogRepository implements ICatalogRepository {

    _prisma: PrismaClient;
    /**
     *
     */
    constructor() {
        this._prisma = new PrismaClient();//just for now
    }
    create(data: Product): Promise<Product> {
      
        return this._prisma.product.create({data});
    }
    update(data: Product): Promise<Product> {
        
        return this._prisma.product.update({
            where: { id: data.id },
            data,
          });
    }
    delete(id: number): any {
        
        return this._prisma.product.delete({
            where: { id },
          });
    }
    find(limit: number, offset: number): Promise<Product[]> {
        
        return this._prisma.product.findMany({
            take: limit,
            skip: offset,
          });
    }
    async findOne(id: number): Promise<Product> {
        
        const product = await this._prisma.product.findFirst({
            where: { id },
          });
          if (product) {
            return Promise.resolve(product);
          }
          throw new Error("product not found");
    }
  
}