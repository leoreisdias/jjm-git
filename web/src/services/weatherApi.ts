import axios from 'axios'

const weatherApi = axios.create({
    baseURL: 'https://api.hgbrasil.com/',
})

export default weatherApi;