export const convertDateStringToUTCDate = (param) => {
  return new Date(Date.UTC(
    Number(param.substring(0, 4)),
    Number(param.substring(5, 7)) - 1,
    Number(param.substring(8, 10)),
    12, // hora do dia em UTC (meio-dia)
    0, // minutos em UTC
    0 // segundos em UTC
  ))
}