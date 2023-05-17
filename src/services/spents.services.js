import axios from 'axios'
// import dotenv from 'dotenv'
// dotenv.config()

const baseURL = 'http://localhost:8080'

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