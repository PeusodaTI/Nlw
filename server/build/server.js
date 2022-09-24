//importando a dependência express
import express from 'express';
//criando a aplicação
const app = express();
//primeiro rota, primeiro endereço da aplicação/ 2 parametros º endereço 2 função qual função irá executar quando o user acessar a aplicação
//www.minhaplicação.ads
// o segundo parametro da função get, tem dois parametros, primeiro a requisição (request) segundo resposta (response) e ao fim da função
//deve sempre ter um retorn (return)
app.get('/ads', (request, response) => {
    //O bacn-end da aplicação sempre retornará um Json
    return response.json([
        { 'id': '1', 'name': 'Anúncio 1' },
        { 'id': '2', 'name': 'Anúncio 2' },
        { 'id': '3', 'name': 'Anúncio 3' },
        { 'id': '4', 'name': 'Pedro' }
    ]);
});
//porta da aplicação (Fica ouvindo requisições e mão para, a menos que o user peça para parar)
app.listen(3333);
