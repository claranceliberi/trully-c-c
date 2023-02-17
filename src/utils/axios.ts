import Axios from 'axios';

export const axios = Axios.create({
    baseURL: 'https://newsapi.org/v2',
    params:{
        apiKey: import.meta.env['VITE_API_KEY']
    }
})