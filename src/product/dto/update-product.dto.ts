export class UpdateProductDto {
  name: string;

  description: string;

  cost: number;

  price: number;

  //   @Max(100)
  //   @Min(0)
  sale: number;

  stock: number;

  status: boolean;

  category_id: string;

  author_id: string;
}
