// let CryptoJS = require("crypto-js");
import CryptoJS from "crypto-js";

const AESDecrypt = (encrypted) => {
    // console.log(encrypted)
    // console.log(process.env.REACT_APP_AES_KEY);
    let decrypted = CryptoJS.AES.decrypt(encrypted, process.env.REACT_APP_AES_KEY).toString(CryptoJS.enc.Utf8);
    // console.log(decrypted);
    return decrypted;
}

export default AESDecrypt;