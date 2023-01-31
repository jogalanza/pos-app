import crypto from 'crypto-js'
const idk = "1d0ntkn03"

export default function(){
    const encrypt = (data) => {
        return crypto.AES.encrypt(data, idk).toString()
    }

    const decrypt = (data, parseJSON = true) => {
        var bytes = crypto.AES.decrypt(data, idk)

        if (!parseJSON) return bytes.toString(crypto.enc.Utf8)
        return JSON.parse(bytes.toString(crypto.enc.Utf8))
    }

    return {
        encrypt,
        decrypt
    }
}