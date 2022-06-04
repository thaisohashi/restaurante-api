import { Router, Request, Response, NextFunction } from 'express';
import { AppDataSource } from './config/data-source';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';

const routes = Router(); //CRIACAO DE ROTAS A PARTIR DO ROUTER

const categoryController = new CategoryController(
    new CategoryService(AppDataSource)
);

//CRIACAO DO PRIMEIRO ENDPOINT PARA VERIFICAR STATUS DO SERVIDOR
routes.get('/', (request: Request, response: Response ) => {
    return response.status(200).json({ status: 'success', version: '1.0.0' });
});

//CRIACAO DE ENDPOINT (ROTA) PARA RETORNAR TODAS AS CATEGORIAS
routes.get('/categories', (request: Request, response: Response, next: NextFunction) => {
    categoryController.getAll(request, response).catch((error: Error) => {
        next(error);
    });
});

//ROTA POST PARA INSERIR UMA NOVA CATEGORIA DENTRO DA VARIÁVEL CATEGORIES
routes.post('/categories', (request: Request, response: Response, next: NextFunction ) => {
    categoryController.create(request, response).catch((error: Error) => {
        next(error);
    });
});

//ROTA QUE RETORNA UMA ÚNICA CATEGORIA SELECIONADA
routes.get('/categories/:id', (request: Request, response: Response, next: NextFunction) => {
    categoryController.show(request, response).catch((error: Error) => {
        next(error);
    });
});

//ROTA PARA ATUALIZAR A CATEGORIA, PEGO O ID PARA SABER QUAL CATEGORIA VAI ATUALIZAR
routes.put('/categories/:id', (request: Request, response: Response, next: NextFunction) => {
    categoryController.update(request, response).catch((error: Error) => {
        next(error);
    });
});

//ROTA PARA DELETAR UMA CATEGORIA, PEGO O ID PARA SABER QUAL CATEGORIA VAI DELETAR
routes.delete('/categories/:id', (request: Request, response: Response, next: NextFunction) => {
    categoryController.delete(request, response).catch((error: Error) => {
        next(error);
    });
});

export { routes };