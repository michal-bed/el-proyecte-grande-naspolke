// import aes from "crypto-js/aes";
import CryptoJS from "crypto-js";

const AESEncrypt = (message) => {
    // console.log(message)
    // console.log(process.env.REACT_APP_AES_KEY);
    let encrypted = CryptoJS.AES.encrypt(message, process.env.REACT_APP_AES_KEY)
    // console.log(encrypted);
    return encrypted;
}

export default AESEncrypt;
