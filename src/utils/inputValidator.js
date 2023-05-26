export const inputValidator = (input) => {
  const { category, date, description, quota, spentValue } = input

  let error = []
  if (!date) error.push({ msg: 'Data Inválida' });
  if (!description) error.push({ msg: 'Descrição Inválida' });
  if (!category) error.push({ msg: 'Categoria Inválida' });
  if (!spentValue) error.push({ msg: 'Valor Inválida' });
  if (isNaN(spentValue)) error.push({ msg: 'Valor Inválida: só é permitido números' });
  if (quota) {
    if (isNaN(quota)) error.push({ msg: 'Parcela Inválida: só é permitido números' });
    if (quota > 60) error.push({ msg: 'Parcela Inválida: é permitido no maximo 60' });
    if (quota < 2) error.push({ msg: 'Parcela Inválida: é permitido no minimo 2' });
  }
  const err = error.reduce((acc, item) => {
    const { msg } = item
    return `${acc + msg}!\n`
  }, '')
  if (error.length) return alert(err);
  return true
}