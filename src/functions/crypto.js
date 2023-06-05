import CryptoJs from "crypto-js";

const key = process.env.REACT_APP_SECRET_KEY;
function decrypto(data){
    const bytes = CryptoJs.AES.decrypt(data, key);
    const original = bytes.toString(CryptoJs.enc.Utf8)
    return original;

}

function encrypto(data){
    const encrypted = CryptoJs.AES.encrypt(data, key).toString()
    return encrypted
}

export {decrypto, encrypto};