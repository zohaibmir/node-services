import { IsNotEmpty, IsNumber, IsString, Length, Min } from "class-validator"

export class ProductRequest {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @Length(10,100)
    description: string;

    @IsNumber()
    @Min(1)
    price: number;

    @IsNumber()
    stock: number;
}