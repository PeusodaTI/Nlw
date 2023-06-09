//importando todas as propriedades do elemento html input 
import { InputHTMLAttributes } from 'react'

//permitindo que o input receba todas as propriedades HTML
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

export function Input(props: InputProps) {
    return (
        <input
            {...props}
            className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
        />
    )
}