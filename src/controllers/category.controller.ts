import { Request, Response } from 'express';
import { CreateCategoryDto } from '../dtos/category/create-category.dto';
import { CreatedCategoryDto } from '../dtos/category/created-category.dto';
import { CategoryService } from '../services/category.service';
import { HttpStatus } from '../utils/enums/http-status.enum';

interface ICategory {
    id?: string,
    name: string,
    created_at: Date,
    updated_at: Date
}

interface CreateCategoryBody extends Request {
    body: CreateCategoryDto;
}


let categories: Array<ICategory> = [];

export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    async getAll(request: Request, response: Response) {
        const categories = await this.categoryService.getAll();
        return response.status(HttpStatus.OK).json(categories);
    }

    async create({body: { name } }: CreateCategoryBody, response: Response): Promise<Response<CreatedCategoryDto>> {
        const createdCategory = await this.categoryService.create({name});
        return response.status(HttpStatus.OK).json(createdCategory);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params; //DESSA VEZ A REQUEST NÃO PEGA OS DADOS DO BODY, E SIM DO PARÂMETRO
        const category = categories.find((category: ICategory) => category.id == id);
        return response.status(HttpStatus.OK).json(category);
    }

    async update(request: Request, response: Response) {
        const data = request.body;
        const { id } = request.params;

        categories = categories.map((category: ICategory) => { //FUNÇÃO PERCORRE TODOS OS ITENS DO ARRAY CATEGORIES E VAI JOGAR DENTRO DA VAR CATEGORY
            if (category.id == id) {
            category = { ...category, name: data.name, updated_at: new Date() } //PEGO TODOS OS ITENS DE CATEGORIA E SOBREESCREVO
            }
            return category;
            });

            return response.status(HttpStatus.NO_CONTENT).json();
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        categories.forEach((category: ICategory, index: number) => { //FOREACH FAZ A MESMA COISA QUE O MAP, MAS NÃO CRIA UMA NOVA ARRAY BASEADA NA ANTERIOR
            if (category.id == id)  categories.splice(index, 1); //FUNCAO SPLICE EXCLUI UM DETERMINADO ITEM A PARTIR DO SEU INDEX
        });

        return response.status(HttpStatus.NO_CONTENT).json();
    }
}