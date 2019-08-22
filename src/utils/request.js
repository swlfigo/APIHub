import axios from 'axios'

const service = axios.create({
    baseURL:"http://localhost:3000/api",
    timeout:5000 //请求时间
})

export default service