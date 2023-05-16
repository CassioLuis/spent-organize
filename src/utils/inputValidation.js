export const inputValidation = (input) => {
  let error = []
  if (input['date'] === '' || input['date'] === null) error.push({ campo: 'date', msg: 'Data Inválida' });
  if (input['description'] === '' || input['description'] === null) error.push({ campo: 'description', msg: 'Descrição Inválida' });
  if (input['category'] === '' || input['category'] === null) error.push({ campo: 'category', msg: 'Categoria Inválida' });
  if (input['spentValue'] === '' || input['spentValue'] === null) error.push({ campo: 'spentValue', msg: 'Valor Inválida' });
  const err = error.reduce((acc, item) => {
    return `${acc + item['msg']}!\n`
  }, '')
  if (!(error.length === 0)) return alert(err);
  return true
}