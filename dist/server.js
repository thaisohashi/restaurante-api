"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const categories = [
    {
        id: 1,
        name: 'NodeJS',
        created_at: '2022-05-31 00:00:00',
        updated_at: '2022-05-31 00:00:00'
    }
];
//CRIACAO DO PRIMEIRO ENDPOINT
app.get('/', (request, response) => {
    return response.status(200).json({ status: 'success', version: '1.0.0' });
});
//CRIACAO DE ENDPOINT PARA LISTAR CATEGORIAS
app.get('/categories', (request, response) => {
    return response.status(200).json(categories);
});
app.listen(3000, () => {
    console.log('Server is running');
});
//# sourceMappingURL=server.js.map