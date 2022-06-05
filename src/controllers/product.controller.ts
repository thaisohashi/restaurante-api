import { ProductService } from '../services/product.service';
import { Request, Response } from 'express';
import { HttpStatus } from '../utils/enums/http-status.enum';
import { CreatedCategoryDto } from '../dtos/category/created-category.dto';

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  async getAll(
    request: Request,
    response: Response,
  ): Promise<Response<CreatedCategoryDto[]>> {
    const products = await this.productService.getAll();
    return response.status(HttpStatus.OK).json(products);
  }

  async show({ params }: Request, response: Response) {
    const product = await this.productService.show(params.id);
    return response.status(HttpStatus.OK).json(product);
  }

  async create(
    { body, file }: Request,
    response: Response,
  ): Promise<Response<CreatedCategoryDto>> {
    const product = await this.productService.create({
      ...body,
      image: file?.filename,
    });
    return response.status(HttpStatus.CREATED).json(product);
  }

  async update({ body: product, params }: Request, response: Response) {
    await this.productService.update(params.id, product.name);
    return response.status(HttpStatus.NO_CONTENT).json();
  }

  async delete({ params }: Request, response: Response) {
    const product = await this.productService.delete(params.id);
    return response.status(HttpStatus.NO_CONTENT).json(product);
  }
}
