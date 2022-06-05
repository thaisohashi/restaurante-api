import { ValidationChain, body } from 'express-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends CreateProductDto {
  static validators(): ValidationChain[] {
    return [body('name', 'Valor name não é uma string!').isString()];
  }
}
