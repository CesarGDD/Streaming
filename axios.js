import axios from 'axios';

const istance = axios.create ({
    baseURL: 'https://api.themoviedb.org/3'
});

export default istance;