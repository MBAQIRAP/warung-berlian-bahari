import axios from 'axios';

const request = axios.create({
    baseURL : "http://10.0.2.2/warung_bahari-api-flightphp",
    timeout: 20000,
    headers: {
        Accept: "application/json",
        'Content-Type': 'multipart/form-data',
    }
})

export default request