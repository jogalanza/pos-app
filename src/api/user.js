import server from '../server'

export default {
    UserAuth(_uname, _pw) {
        return server.post(`user/auth`, {
            username: _uname,
            pw: _pw
        })
    },
    UploadProfilePhoto(data, id, progressCallback) {
        return server.post(`employee/uploadpicts/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: progressCallback !== undefined ? progressCallback : function () {

            }
        })
    },
}