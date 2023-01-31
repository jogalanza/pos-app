import axios from 'axios'
import https from 'https'
import { Cookies } from 'quasar'

var server_address = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3567/';
axios.defaults.baseURL = window.invapp.serverAddress ? window.invapp.serverAddress : server_address
axios.defaults.withCredentials = true;
axios.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized: false
})

axios.interceptors.request.use(function(config) {
    //update timeout cookie
    if (config.url !== 'user/auth') Cookies.set('_t', "a", { expires: window.invapp.to !== undefined && window.invapp.to !== null ? window.invapp.to : '5m' })

    //console.log('axios inerceptor', config, window.location.hash)
    // Get the token from session storage
    //var token = SessionStorage.getItem('token');
 
    // Check valid token
    // if (token === null) {
    //     let publicPath = ['#/login', '#/forget-password'];
     
    //     // Redirect to Login if login required
    //     if (publicPath.indexOf(window.location.hash) === -1) {
    //         window.location.href = '/#/login'
    //     }
     
    //  } else {
    //     // Set token
    //     token = JSON.parse(token)
    //     if (token) {
    //         config.headers.Authorization = 'Bearer ' + token
    //     }
    //  }

     return config;
 });

export default axios