import axios from 'axios'
// import dotenv from 'dotenv'
// dotenv.config()

const baseURL = 'http://localhost:8080'
// const baseURL = 'https://spent-api-3yrl.onrender.com'

// 'https://spent-api-3yrl.onrender.com'
// process.env.SPENT_API

export function getAllCategories() {
  const response = axios.get(`${baseURL}/category`)
  return response
}

export async function postCategory(body) {
  try {
    const req = await axios.post(`${baseURL}/category`, body)
    return req
  }
  catch (error) {
    const { message } = error.response.data
    return alert(message)
  }
}

export function deleteCategory(categoryId) {
  const req = axios.delete(`${baseURL}/category/${categoryId}`)
  return req
}