export const setInfo = (obj) => {
  localStorage.setItem('shopping_info', JSON.stringify(obj))
}

export const getInfo = () => {
  const result = localStorage.getItem('shopping_info')
  return JSON.parse(result)
}

export const removeInfo = () => {
  localStorage.removeItem('shopping_info')
}

export const getSearch = () => {
  return localStorage.getItem('shopping_search') ? JSON.parse(localStorage.getItem('shopping_search')) : []
}

export const setSearch = (obj) => {
  localStorage.setItem('shopping_search', JSON.stringify(obj))
}
