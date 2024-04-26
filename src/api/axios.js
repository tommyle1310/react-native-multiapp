
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';


const instance = axios.create({
    baseURL: 'https://e0db-2001-ee0-4fc7-c210-b1a1-e26b-6170-370f.ngrok-free.app'
})

instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)

export default instance