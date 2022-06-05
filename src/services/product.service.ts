import { Repository, DataSource } from 'typeorm';
import { CreateProductDto } from '../dtos/product/create-product.dto';
import { CreatedProductDto } from '../dtos/product/created-product.dto';
import { ProductEntity } from '../entities/product.entity';
import { HttpException } from '../handler-exceptions/http-exception.provider';
import { HttpStatus } from '../utils/enums/http-status.enum';

export class ProductService {
  private productRepository: Repository<ProductEntity>;

  constructor(private readonly connection: DataSource) {
    this.productRepository = this.connection.getRepository(ProductEntity);
  }

  async getAll(): Promise<CreatedProductDto[]> {
    try {
      const products = await this.productRepository.find({
        relations: ['category'],
      });
      return products.map((product) => new CreatedProductDto(product));
    } catch (error) {
      throw new HttpException(
        'Houve um erro ao listar os produtos!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async show(id: string): Promise<CreatedProductDto> {
    try {
      const product = await this.productRepository.findOne({
        relations: ['category'],
        where: { id },
      });
      if (!product) {
        throw new HttpException(
          'Produto não encontrado!',
          HttpStatus.NOT_FOUND,
        );
      }
      return new CreatedProductDto(product);
    } catch (error) {
      throw new HttpException(
        'Houve um erro ao procurar o produto!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create({
    name,
    description,
    value,
    person_count,
    disponibility,
    image,
    categoryId,
  }: CreateProductDto): Promise<CreatedProductDto> {
    try {
      const createProduct = this.productRepository.create({
        name,
        description,
        value,
        person_count,
        disponibility,
        image,
        category: { id: categoryId },
      });
      const saveProduct = await this.productRepository.save(createProduct);
      return new CreatedProductDto(saveProduct);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Houve um erro ao cadastrar o produto!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, name: string): Promise<void> {
    try {
      await this.productRepository.update(id, { name });
    } catch (error) {
      throw new HttpException(
        'Houve um erro ao atualizar o produto!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.productRepository.delete({ id });
    } catch (error) {
      throw new HttpException(
        'Houve um erro ao deletar o produto!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
