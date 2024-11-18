import request from "./utils/request";

class Api {
    static urlAPI() {
        return "https://dummyjson.com"
    }

    static products() {
        let path = '/products';
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET'
        })
    }
}

export default Api