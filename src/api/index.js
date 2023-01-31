import server from '../server'


//board api assets

export default {
    //Employees Data
    TestCall(data) {
        return server.post('test', { info: data })
    },
  
}