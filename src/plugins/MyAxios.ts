import axios from "axios"

const Getinformation = axios.create({
    baseURL: "http://10.81.8.114:8081/",
    timeout: 10000,
})


export {Getinformation};