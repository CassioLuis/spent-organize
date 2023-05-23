import axios from 'axios'
// import dotenv from 'dotenv'
// dotenv.config()

const baseURL = 'http://localhost:8080'
// const baseURL = 'https://spent-api-3yrl.onrender.com'

// 'https://spent-api-3yrl.onrender.com'
// process.env.SPENT_API

export function getAllSpents() {
  const response = axios.get(`${baseURL}/spents`)
  return response
}

export function postSpent(body) {
  const req = axios.post(`${baseURL}/spents`, body)
  return req
}

export function deleteSpent(spentId) {
  const req = axios.delete(`${baseURL}/spents/${spentId}`)
  return req
}

export async function updateSpent(body) {
  try {
    console.log(body);
    const req = await axios.patch(`${baseURL}/spents/${body._id}`, body)
    return req
  }
  catch (error) {
    const { message } = error.response.data
    return alert(message)
  }
}
