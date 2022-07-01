import axios from 'axios'

const baseURL = process.env.VUE_APP_BACKEND_HOST

export default axios.create({
    baseURL,
})
