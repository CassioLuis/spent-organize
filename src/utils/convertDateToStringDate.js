import { convertDateStringToUTCDate } from '../utils/convertDateStringToUTCDate.js'

export const convertDateToStringDate = (param) => {
  const newStringDate = convertDateStringToUTCDate(param)
  const dateStringFormat = { month: 'short', day: 'numeric' }
  const presentationDateToString = newStringDate.toLocaleDateString('pt-BR', dateStringFormat)
  const regex = /(\d{1,2}) de (\w+)/i;
  const [_, day, month] = regex.exec(presentationDateToString);
  return `${day} ${month.toUpperCase()}.`
}