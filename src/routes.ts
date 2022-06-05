import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { AppDataSource } from './config/data-source';
import { multerConfig } from './config/multer';
import { CategoryController } from './controllers/category.controller';
import { ProductController } from './controllers/product.controller';
import { CreateCategoryDto } from './dtos/category/create-category.dto';
import { UpdateCategoryDto } from './dtos/category/update-category.dto';
import { CreateProductDto } from './dtos/product/create-product.dto';
import { UpdateProductDto } from './dtos/product/update-product.dto';
import { validator } from './middlewares';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';

const routes = Router(); //CRIACAO DE ROTAS A PARTIR DO ROUTER

const categoryController = new CategoryController(
  new CategoryService(AppDataSource),
);

const productController = new ProductController(
  new ProductService(AppDataSource),
);

//CRIACAO DO PRIMEIRO ENDPOINT PARA VERIFICAR STATUS DO SERVIDOR
routes.get('/', (request: Request, response: Response) => {
  return response.status(200).json({ status: 'success', version: '1.0.0' });
});

//CRIACAO DE ENDPOINT (ROTA) PARA RETORNAR TODAS AS CATEGORIAS
routes.get(
  '/categories',
  (request: Request, response: Response, next: NextFunction) => {
    categoryController.getAll(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

//ROTA POST PARA INSERIR UMA NOVA CATEGORIA DENTRO DA VARIÁVEL CATEGORIES
routes.post(
  '/categories',
  CreateCategoryDto.validators(),
  validator,
  (request: Request, response: Response, next: NextFunction) => {
    categoryController.create(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

//ROTA QUE RETORNA UMA ÚNICA CATEGORIA SELECIONADA
routes.get(
  '/categories/:id',
  (request: Request, response: Response, next: NextFunction) => {
    categoryController.show(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

//ROTA PARA ATUALIZAR A CATEGORIA, PEGO O ID PARA SABER QUAL CATEGORIA VAI ATUALIZAR
routes.put(
  '/categories/:id',
  UpdateCategoryDto.validators(),
  validator,
  (request: Request, response: Response, next: NextFunction) => {
    categoryController.update(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

//ROTA PARA DELETAR UMA CATEGORIA, PEGO O ID PARA SABER QUAL CATEGORIA VAI DELETAR
routes.delete(
  '/categories/:id',
  (request: Request, response: Response, next: NextFunction) => {
    categoryController.delete(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

//ENDPOINT PARA LISTAR TODOS OS PRODUTOS
routes.get(
  '/products',
  (request: Request, response: Response, next: NextFunction) => {
    productController.getAll(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

//ENDPOINT PARA CADASTRAR UM NOVO PRODUTO
routes.post(
  '/products',
  multer(multerConfig).single('image'),
  CreateProductDto.validators(),
  validator,
  (request: Request, response: Response, next: NextFunction) => {
    productController.create(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

//ENDPOINT QUE RETORNA UM ÚNICO PRODUTO SELECIONADO
routes.get(
  '/products/:id',
  (request: Request, response: Response, next: NextFunction) => {
    productController.show(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

//ENDPOINT PARA ATUALIZAR PRODUTO
routes.put(
  '/products/:id',
  UpdateProductDto.validators(),
  validator,
  (request: Request, response: Response, next: NextFunction) => {
    productController.update(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

//ENDPOINT PARA DELETAR UM PRODUTO
routes.delete(
  '/products/:id',
  (request: Request, response: Response, next: NextFunction) => {
    productController.delete(request, response).catch((error: Error) => {
      next(error);
    });
  },
);

export { routes };
