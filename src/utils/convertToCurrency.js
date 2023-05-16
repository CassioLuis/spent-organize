export const convertToCurrency = (value) => {
  return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}