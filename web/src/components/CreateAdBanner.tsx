//importação da biblioteca phosphor-react
//para utilizar a lupa do botão da página line 16
import { MagnifyingGlassPlus } from "phosphor-react";

//importando a biblioteca radix-ui instalada
//importando todos os componentes e colocando dentro de um objeto "* as"
import * as Dialog from '@radix-ui/react-dialog'

//componente que exporta o banner de criação de anúncio da nossa página principal
export function CreateAdBanner() {
    return(
        <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg mt-8 overflow-hidden">
        <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
          <div>
            <strong className="text-2xl text-white font-black block">Não encontrou seu dou?</strong>
            <span className="text-zinc-400 block">Publique um anúncio para encontrar novos players!</span>
          </div>

          <Dialog.Trigger className="py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3">
            <MagnifyingGlassPlus size={24}/>
            Publicar anúncio
          </Dialog.Trigger>
        </div>
      </div>
    )
}