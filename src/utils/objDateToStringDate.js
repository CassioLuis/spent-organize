export const objDateToStringDate = (param) => {
  const { month, year } = param
  return `${year}-${month.toString().length === 1 ? '0' + month : month}`
}