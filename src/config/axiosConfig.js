
const axios = require('axios');
const instance = axios.create({
baseURL: "http://192.168.0.100:12233/",
timeout: 15000, // in milliseconds
headers: {
'Content-Type': 'application/json',
'Accept': 'application/json',
},
})
export default instance;