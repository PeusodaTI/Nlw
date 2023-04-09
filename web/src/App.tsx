//importando o useState para utilização das variáveis de estado
import { useState, useEffect } from 'react';

//importando a biblioteca radix-ui instalada
//importando todos os componentes e colocando dentro de um objeto "* as"
import * as Dialog from '@radix-ui/react-dialog'

//importação do componente GameBanner criado /components
import { GameBanner } from './components/GameBanner';

//importação do componente CreateAdBanner /componets
import { CreateAdBanner } from './components/CreateAdBanner';

//importando o componente Modal
import { CreateAdModal } from './components/CreateAdModal';

//importando a imagem de logo
import imageLogo from './assets/logo-nlw-esports.svg';

//importando o css principal da aplicação
import './styles/main.css';

//Importando o Axios para comunicação com a API
import axios from 'axios';

//interface para indificar os dados que serão enviados para o game
//Formato da informação que virá da API
interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
      ads: number;
  }
}

function App() {
  //utilizando o useState com desestruturação de array, primeiro parâmetro variável, segundo
  //função para troca do valor da variável.
  //Será informado que o useState refere-se a um array de objetos "Game" que possui o formato "interface Game"
  const [games, setGames] = useState<Game[]>([])

  //usando o useEffect - efeito colateral da mudança de estado da variável 
  //se deixarmos o segundo parâmetro da useEffect como [] "array de dependência" o código da função
  //será executada apenas uma única vez, independente da quantidade de vezes que o estado do componente mudar
  useEffect(() => {
    //fazendo uma busca nos dados dos Games na API criada
    axios('http://localhost:3333/games').then(response => {
        setGames(response.data)
      })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={imageLogo} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      {/*
        Div utilizada para apresentação dos jogos
        função map percorre o array games e retorna os valores de cada item.
      */ 
      }
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game => {
          return (
            <GameBanner 
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title} 
              adsCount={game._count.ads}
            />    
          )
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>

    </div>
  )
}

export default App
