const cryptoJs=require('crypto-js')

const key='ljhdsgfygiuhg376jhdshyeryt6'

function crypto(){

  function getEncrypto(input){
     var enc= cryptoJs.AES.encrypt(input,key)
     return enc.toString();
  }
  function getDecrypto(input){
      var dec=cryptoJs.AES.decrypt(input,key)
      return dec.toString(cryptoJs.enc.Utf8)
  }
return {
    getDecrypto,
    getEncrypto
}
}
module.exports=crypto();