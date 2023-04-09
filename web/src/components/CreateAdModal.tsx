//importação do ícone no botão submit do modal Dialog
import { Check, GameController } from 'phosphor-react';

//importando o useState para utilização das variáveis de estado
import { useState, useEffect, FormEvent } from 'react';

//importando a biblioteca radix-ui instalada
//importando todos os componentes e colocando dentro de um objeto "* as"
import * as Dialog from '@radix-ui/react-dialog'

//importando a biblioteca radix-ui instalada
//importando todos os componentes e colocando dentro de um objeto "* as"
//Lib checkbox radix 
import * as Checkbox from '@radix-ui/react-checkbox'

//importação do Radix ToggleGroup
import * as ToggleGroup from '@radix-ui/react-toggle-group';

//importando o componente de estilização do Input do form modal
import { Input } from './Form/Input';

//Importando o Axios para comunicação com API
import axios from 'axios';

//interface para indificar os dados que serão enviados para o game
//Formato da informação que virá da API
interface Game {
    id: string;
    title: string;
}

export function CreateAdModal() {
  //utilizando o useState com desestruturação de array, primeiro parâmetro variável, segundo
  //função para troca do valor da variável.
  //Será informado que o useState refere-se a um array de objetos "Game" que possui o formato "interface Game"
  const [games, setGames] = useState<Game[]>([])

  //Estado utilizado para guardar a seleção dos dias da semana
  const [weekDays, setWeekDays] = useState<String[]>([])

  //Estado utilziado para armazenar o checkbox de useVoiceChannel
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)

  //usando o useEffect - efeito colateral da mudança de estado da variável 
  //se deixarmos o segundo parâmetro da useEffect como [] "array de dependência" o código da função
  //será executada apenas uma única vez, independente da quantidade de vezes que o estado do componente mudar
  useEffect(() => {
      //fazendo uma busca nos dados dos Games na API criada
      axios('http://localhost:3333/games').then(response => {
          setGames(response.data)
      })
  }, [])

  //Recebe os dados do Form e enviam para a API através do Axios
  //utilizando o async para que a comunicação seja assincrona
  async function handleCreatAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    //previnir que o form seja enviado totalmente vázio
    if(!data.name) {
      return;
    }

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),  
        discord: data.discord,
        weekDays: weekDays.map(Number),
        HourStart: data.HourStart,
        HourEnd: data.HourEnd,
        useVoiceChanel: useVoiceChannel
    })
    
      alert('Anúncio criado com sucesso!');

    } catch(err) {
      console.log(err);
      alert('Erro ao criar anúncio!');
    }
  }

  return (
      <Dialog.Portal>
        <Dialog.Overlay />

        <Dialog.Content className="fixed bg-[#2A2634] py-8 px-6 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[450px] shadow-lg shadow-black/25">
          <Dialog.Title className="text-2xl font-black ">Publique um anúncio</Dialog.Title>

          <form onSubmit={handleCreatAd} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="game" className="font-semibold">Qual o game?</label> 
              <select 
                  name="game"
                  id="game" 
                  className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
                  defaultValue=""
              >
                  
                  <option disabled value="">Selecione o game que deseja jorga</option>

                  {games.map(game => {
                      return (
                          <option key={game.id} value={game.id}>{game.title}</option>
                      )
                  })}
              </select> 
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name">Seu nome ou (nickname)</label> 
              <Input id="name" name="name" placeholder="Como te chamam dentro do game?" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="yearsPlaying">Joga há quantos anos?</label> 
                <Input id="yearsPlaying" name="yearsPlaying" type="number" placeholder="Pode ser 0" />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="discord">Qual seu discord</label> 
                <Input id="discord" name="discord" type="text" placeholder="Discord" />
              </div>
            </div>
            
            <div className="flex gap-6"> 
              <div className="flex flex-col gap-2">
                <label htmlFor="weekDays">Quando costuma jogar?</label>

                <ToggleGroup.Root 
                  type="multiple" 
                  className="grid grid-cols-4 gap-2"
                  value={weekDays}
                  onValueChange={setWeekDays} 
                  >
                  <ToggleGroup.Item 
                      value="0"
                      title="domingo" 
                      className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  >
                      D
                  </ToggleGroup.Item >
                  <ToggleGroup.Item 
                      value="1"
                      title="segunda" 
                      className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  >
                      S
                  </ToggleGroup.Item >
                  <ToggleGroup.Item 
                      value="2" 
                      title="terca" 
                      className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  >
                      T
                  </ToggleGroup.Item >
                  <ToggleGroup.Item 
                      value="3"
                      title="quarta" 
                      className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  >
                      Q
                  </ToggleGroup.Item >
                  <ToggleGroup.Item 
                      value="4"
                      title="quinta" 
                      className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  >
                      Q
                  </ToggleGroup.Item >
                  <ToggleGroup.Item 
                      value="5" 
                      title="sexta" 
                      className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  >
                      S
                  </ToggleGroup.Item >
                  <ToggleGroup.Item 
                      value="6"
                      title="sabado" 
                      className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  >
                      S
                      </ToggleGroup.Item >
                </ToggleGroup.Root>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="HourStart">Qual horário do dia?</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input id="HourStart" name="HourStart" type="time" placeholder="De" />
                  <Input id="HourEnd" name="HourEnd" type="time" placeholder="Até" />
                </div>
              </div>
            </div> 
            
            <label className="mt-2 flex gap-2 text-sm items-center">
              <Checkbox.Root 
                checked={useVoiceChannel}
                onCheckedChange={(checket) => {
                  if (checket === true) {
                    setUseVoiceChannel(true)
                  } else {
                    setUseVoiceChannel(false)
                  }
                }}
                className="w-6 h-6 p-1 rounded bg-zinc-900"
                >
                  <Checkbox.Indicator>
                      <Check className="w-4 h-4 text-emerald-400"/>
                  </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conectar ao chat de voz
            </label>

            <footer className="mt-4 flex justify-end gap-4">
              <Dialog.Close 
                type="button"
                className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
                  Cancelar
              </Dialog.Close>

              <button 
                type="submit" 
                className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
              >
                <GameController className="w-6 h-6"/>
                Encontrar Duo
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
  );
}