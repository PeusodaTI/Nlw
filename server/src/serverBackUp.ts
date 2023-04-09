//importando a dependência express
import express from 'express'

//importar a dependência @prisma/cliente
import { PrismaClient } from '@prisma/client';

//importação da função para conversão de horas em minutos.
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';

//criando a aplicação
const app = express()

//permite que o express entenda formato Json 
app.use(express.json)

//criar a conexão com o DB 
const prisma = new PrismaClient({
    log: ['query']
})

//rota para exibição dos games
//utilizando a sintaxe async await para aguardar o carregamento da consulta SQL findMany
//a consulta busca também o número de anúncio L 19-25 
app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    })

    //como o games é um array, posso retornar ele como Json
    return response.json(games);
});

//rota para criação de anúncio utilizando concatenação de recursos /games/:id
app.post('/games/:id/ads', async (request, response) => {
    //recebendo o parâmentro da URL
    const gameId = request.params.id;

    //recebendo os dados enviados na requisição utilizando o método body - 
    //para que o express entenda o formato JSON foi adicionado L 12
    const body: any = request.body;

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            HourStart: convertHourStringToMinutes(body.HourStart),
            HourEnd: convertHourStringToMinutes(body.HourEnd),
            useVoiceChanel: body.useVoiceChanel,
        }
    })
    console.log('cheguei');
    return response.status(201).json(ad);
});

//primeiro rota, primeiro endereço da aplicação/ 2 parametros º endereço 2 função qual função irá executar quando o user acessar a aplicação
//www.minhaplicação.ads
// o segundo parametro da função get, tem dois parametros, primeiro a requisição (request) segundo resposta (response) e ao fim da função
//deve sempre ter um retorn (return)
app.get('/games/:id/ads', async (request, response) => {
    //recebendo o valor passado por params
    const gameId = request.params.id

    //buscando todos os Id que estão associados ao gameId
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChanel: true,
            yearsPlaying: true,
            HourStart: true,
        }, 
        where: {
            gameId,
        },
        orderBy: {
            createAt: 'asc',
        }
    }) 

    //O bacn-end da aplicação sempre retornará um Json
    //percorrerá pelo "ads" e formatará os dados de dados da semana
    return response.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(',')
        }
    }))
})

//rota buscar o discord do usuário
app.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id

    //busca no DB o discord pelo ID informado na URL, com o método finFirstOrThrow, caso não seja
    //encontrado nenhum dado com o ID informando, será retornado erro antes do return do método app.get
    const ad = await prisma.ad.findFirstOrThrow({
        select: {
            discord: true,
        }, 
        where: {
            id: adId,
        }
    })

    //será retornado um objeto pelo Json contendo o nome do discord solicitado
    return response.json({
        discord: ad.discord,
    });
})
//porta da aplicação (Fica ouvindo requisições e mão para, a menos que o user peça para parar)
app.listen(3333)