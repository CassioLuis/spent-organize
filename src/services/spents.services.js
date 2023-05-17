import axios from 'axios'
// import dotenv from 'dotenv'
// dotenv.config()

const baseURL = 'https://spent-api-3yrl.onrender.com'

// 'https://spent-api-3yrl.onrender.com'
// process.env.SPENT_API

export function getAllSpents() {
  const response = axios.get(`${baseURL}/spents`)
  return response
}