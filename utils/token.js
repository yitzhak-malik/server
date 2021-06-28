const cryptoJs=require('crypto-js')
const Bcrypt=require('bcryptjs')
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
  function cryptPassword(password){
    const hash = Bcrypt.hashSync(password, 10);
    return hash;
}

function compare(password1, hash) {
    return Bcrypt.compareSync(password1, hash);
}
return {
    getDecrypto,
    getEncrypto,
    cryptPassword,
    compare
}
}
module.exports=crypto();