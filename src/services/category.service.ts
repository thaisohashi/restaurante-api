import { DataSource, Repository } from 'typeorm';
import { CreateCategoryDto } from '../dtos/category/create-category.dto';
import { CreatedCategoryDto } from '../dtos/category/created-category.dto';
import { CategoryEntity } from '../entities/category.entity';
import { HttpException } from '../handler-exceptions/http-exception.provider';
import { HttpStatus } from '../utils/enums/http-status.enum';

export class CategoryService {
  private categoryRepository: Repository<CategoryEntity>;

  constructor(private readonly connection: DataSource) {
    this.categoryRepository = this.connection.getRepository(CategoryEntity);
  }

  async getAll(): Promise<CreatedCategoryDto[]> {
    try {
      const categories = await this.categoryRepository.find();
      return categories.map((category) => new CreatedCategoryDto(category));
    } catch (error) {
      throw new HttpException(
        'Houve um erro ao listar categorias!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async show(id: string): Promise<CreatedCategoryDto> {
    try {
      const category = await this.categoryRepository.findOne({ where: { id } });
      if (!category) {
        throw new HttpException(
          'Categoria não encontrada!',
          HttpStatus.NOT_FOUND,
        );
      }
      return new CreatedCategoryDto({ id: category.id, name: category.name });
    } catch (error) {
      throw new HttpException(
        'Houve um erro ao procurar a categoria!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create({ name }: CreateCategoryDto): Promise<CreatedCategoryDto> {
    try {
      const createCategory = this.categoryRepository.create({ name });
      const savedCategory = await this.categoryRepository.save(createCategory);
      return new CreatedCategoryDto(savedCategory);
    } catch (error) {
      throw new HttpException(
        'Houve um erro ao adicionar a categoria!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, name: string): Promise<void> {
    try {
      await this.categoryRepository.update(id, { name });
    } catch (error) {
      throw new HttpException(
        'Houve um erro ao atualizar a categoria!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.categoryRepository.delete({ id });
    } catch (error) {
      throw new HttpException(
        'Houve um erro ao deletar a categoria!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
