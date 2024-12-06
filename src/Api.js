import request from "./utils/request";

class Api {
    static login(nama,password){
        return request.post('/login',{nama: nama, password: password});
    }


}

export default Api