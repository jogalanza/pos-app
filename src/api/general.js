import server from '../server'

export default {
    GetPDF(path){
        return server.get(path, {
            responseType: 'blob'
        })
    },    
}