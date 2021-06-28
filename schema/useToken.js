const encToken=require('../utils/token')

const split='<?>'
const ttl=1000*60*10


function useToken(isNew,token,fullName,_id,role,roleNum,_idS){
if(isNew){
    // this.fullName=fullName
    // this._id=_id
    // this.role=role
    // this.roleNum=roleNum
    this.expirationTime = Date.now() + ttl;
    this.token=encToken.getEncrypto(
        fullName+split+
        _id+split+
        role+split+
        roleNum+split+
       this.expirationTime+split
       +_idS
    )
}else{
    this.token=token
    var data = encToken.getDecrypto(token).split(split)
    this.fullName=data[0]
    this._id=data[1]
    this.role=data[2]
    this.roleNum=data[3]
    this.expirationTime = data[4]
    this._idS = data[5]

}
this.isNotExprision=function () {
    
    return this.expirationTime && +this.expirationTime > Date.now()
}

}
module.exports=useToken