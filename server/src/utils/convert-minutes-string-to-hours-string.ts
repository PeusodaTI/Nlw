/*
    Função para converter minutos em horas
    1080 => 18:00
     ["18", "00"] => [18, 00]   
*/
export function convertMinutesToHourString(minutesAmount: number ) {
    //hour = a divisão dos minutos por 60 arredondando pra baixo este valor
    const hour = Math.floor(minutesAmount / 60);
    //minutes = o resto da divisão dos minutos por 60
    const minutes = minutesAmount % 60;

    //retornando uma interpolação
    //Além disso, o as horas e minutos estão sendo convertidos para String() e, caso não haja 2 digitos
    //após virgula, será adicionado um 0 .padStart(2, '0)
    return `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}