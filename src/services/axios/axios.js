import axios from 'axios'
const baseURL = import.meta.env.VITE_APP_BASE_URL

const axiosFunctions = {
    async axiosGet({url}) {
        axiosFunctions.checkAxiosConfig()
        let response
        await axios.get(url)
            .then((res) => {
                response = {status: 'success', data: res}
            })
            .catch(error => {
                response = {status: 'error', data: error}
            })
            return response
    },

    checkAxiosConfig() {
        axios.defaults.baseURL = baseURL
        axios.defaults.headers.common.Accept = 'application/json, text/plain, */*'
        axios.defaults.headers.common['Content-type'] = 'application/json'
    }

}


export default axiosFunctions;









