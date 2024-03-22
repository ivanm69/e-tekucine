import axios from "axios";




const HttpService = axios.create({

    baseURL:'https://plax69-001-site1.itempurl.com/api/v1',
    headers:{
        'Content-Type': 'application/json'
}

});
export default HttpService;