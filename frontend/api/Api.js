import axios from 'axios';

class Api {

    constructor() {
        this.baseUrl = 'http://localhost:5000/api/v1/';
    }

    getData(path) {
        let url = `${this.baseUrl}${path}`;
        return axios.get(`${url}`);
    }

    postData(path, data) {
        let url = `${this.baseUrl}${path}`;
        return axios.post(`${url}`, data);
    }

    // async getCuisines() {
    //     const results = await axios.get(`${apiUrl} + /cuisines`);
    //     console.log("results", results);
    //     //return results.length > 0 ? results[0] : null;
    // }
}

export default (new Api());