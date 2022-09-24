/*
    Função para converter horas em minutos
    18:00 => ["18", "00"] => [18, 00]   
*/
export function convertHourStringToMinutes(HourString: string ) {
    //convertendo o string para array
    // 18:00 => ["18", "00"] => [18, 00] 
    const [hours, minutes] = HourString.split(':').map(Number);

    const minutesAmount = (hours * 60) + minutes;

    return minutesAmount;
}